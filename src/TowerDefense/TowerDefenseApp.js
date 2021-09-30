import { useEffect, useRef } from "react";
import { MAP_1, TILES_X, TILES_Y } from "./config";
import Wave from "./Wave";
import Enemy from "./Enemy";
import Grass from "./Grass";
import Road from "./Road";
import Hq from "./Hq";
import app from "./PixiApp";
import * as clock from "../clock";
import { setCurrent, setSurvived } from "../waves";
import store from "../gameState";
import css from "./TowerDefense.module.css";

const TILES = {
  x: Road,
  "-": Grass
};

function detectGameOver(app) {
  const credits = store.getState().credits;
  if (credits < 0) {
    for (const child of app.stage.children) {
      if (child instanceof Hq || child instanceof Enemy) {
        app.stage.removeChild(child);
      }
    }
    app.ticker.stop();
  }
}

function mountPixi(el) {
  // Render background tiles
  app.loader.load((loader, resources) => {
    for (let i = 0; i < TILES_X; i++) {
      for (let j = 0; j < TILES_Y; j++) {
        const tileType = MAP_1[j][i];
        const tile = new TILES[tileType](i, j);
        app.stage.addChild(tile);
      }
    }
  });

  el.appendChild(app.view);

  let currentWave = null;
  let lastWave = 0;

  // use custom clock to easily sync everything and pause when tab is not visible
  return clock.addListener((frame, delta) => {
    const hq = new Hq(app);
    app.stage.addChild(hq);

    for (const child of app.stage.children) {
      if (child.update) child.update(delta);
    }

    detectGameOver(app);

    if (!currentWave) {
      // TODO: the way it is implemented, you cannot have two ways simultaneously (calling it early or being so slow the next is triggered)
      currentWave = new Wave(++lastWave);
      store.dispatch(setCurrent(lastWave));
      currentWave.enemies.forEach(enemy => app.stage.addChild(enemy));
      currentWave.on("destroyed", () => {
        currentWave = null;
        store.dispatch(setSurvived(lastWave));
      });
      app.stage.wave = currentWave;
    }
  });
}

export default function TowerDefenseApp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    const unmount = mountPixi(el);

    return () => {
      for (const node of [...el.childNodes]) {
        node.remove();
      }
      unmount();
    };
  }, []);

  return <div ref={ref} className={css.TowerDefense}></div>;
}

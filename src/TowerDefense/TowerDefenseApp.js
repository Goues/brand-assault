import { useEffect, useRef } from "react";
import { MAP_1, TILES_X, TILES_Y } from "./config";
import Wave from "./Wave";
import Grass from "./Grass";
import Road from "./Road";
import app from "./PixiApp";
import * as clock from "../clock";

function getTile(type, tileX, tileY) {
  if (type === "x") {
    return new Road(tileX, tileY);
  }
  // render anything else as grass
  return new Grass(tileX, tileY);
}

function mountPixi(el) {
  // Render background tiles
  app.loader.load((loader, resources) => {
    for (let i = 0; i < TILES_X; i++) {
      for (let j = 0; j < TILES_Y; j++) {
        const tileType = MAP_1[j][i];
        const tile = getTile(tileType, i, j);
        app.stage.addChild(tile);
      }
    }
  });

  el.appendChild(app.view);

  let currentWave = null;
  let lastWave = 0;

  return clock.addListener((frame, delta) => {
    for (const child of app.stage.children) {
      if (child.update) child.update(delta);
    }

    if (!currentWave) {
      // TODO: the way it is implemented, you cannot have two ways simultaneously (calling it early or being so slow the next is triggered)
      currentWave = new Wave(++lastWave);
      currentWave.enemies.forEach(enemy => app.stage.addChild(enemy));
      currentWave.on("destroyed", () => {
        currentWave = null;
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

  return <div ref={ref}></div>;
}

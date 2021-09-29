import { useEffect, useRef } from 'react';
import { LEVELS, MAP_1, TILES_X, TILES_Y} from './config';
import Enemy from './Enemy';
import Grass from './Grass';
import Road from './Road';
import app from "./PixiApp"

function getTile (type, tileX, tileY) {
  if (type === 'x') {
    return new Road(tileX, tileY)
  }
  // render anything else as grass
  return new Grass(tileX, tileY)
}

function mountPixi (el) {
  // Render background tiles
  app.loader
  .load((loader, resources) => {
    for (let i = 0; i < TILES_X; i++) {
      for (let j = 0; j < TILES_Y; j++) {
        const tileType = MAP_1[j][i]
        const tile = getTile(tileType, i, j);
        app.stage.addChild(tile);
      }
    }

    const now = Date.now()
    app.ticker.add((delta) => {
      const elapsed = Date.now() - now

      for (const child of app.stage.children) {
        if (child.update) child.update(delta)
      }

      for (let wave = 1; wave <= LEVELS.length; wave++) {
        const level = LEVELS[wave - 1]
        const offset = (level.maxEnemies - level.enemies) * 500
        if (elapsed >= level.startAt * 1000 + offset && level.enemies) {
          level.enemies -= 1

          const enemy = new Enemy(wave)

          app.stage.addChild(enemy)
        }
      }
    })
  })

  el.appendChild(app.view)
}

export default function TowerDefenseApp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    mountPixi(el)

    return () => {
      for (const node of [...el.childNodes]) {
        node.remove()
      }
    }
  }, [])

  return <div ref={ref}></div>
}

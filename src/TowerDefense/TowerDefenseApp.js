import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react';
import { MAP_1, TILES_X, TILES_Y, TILE_HEIGHT, TILE_WIDTH } from './config';
import app from "./PixiApp"

function getTile (resources, type) {
  if (type === 'x') {
    return new PIXI.Sprite(resources.road.texture)
  }
  // render anything else as grass
  return new PIXI.Sprite(resources.grass.texture)
}

function mountPixi (el) {
  // Render background tiles
  app.loader
  .add('grass', '/grass_tile.jpg')
  .add('road', '/road_tile.jpg')
  .load((loader, resources) => {
    for (let i = 0; i < TILES_X; i++) {
      for (let j = 0; j < TILES_Y; j++) {
        const tileType = MAP_1[j][i]
        const tile = getTile(resources, tileType);
        tile.x = i * TILE_WIDTH
        tile.y = j * TILE_HEIGHT
        tile.width = TILE_WIDTH
        tile.height = TILE_HEIGHT

        if (tileType === '-') {
          tile.interactive = true
          tile.buttonMode = true
          tile.on('pointerdown', (e) => {
            alert('clicked!' + e.target.x + ' ' + e.target.y)


          });
        }

        app.stage.addChild(tile);
      }
    }
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

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

      app.stage.addChild(tile);
    }
  }
})

export default function TowerDefenseApp() {
  const ref = useRef(null)
  useEffect(() => {
    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    ref.current.appendChild(app.view);
  }, [])

  return <div ref={ref}></div>
}

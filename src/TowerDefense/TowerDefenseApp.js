import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react';
import { TILE_HEIGHT, TILE_WIDTH } from './config';
import app from "./PixiApp"

app.loader.add('grass', '/grass_tile.jpg').load((loader, resources) => {
  const tile = new PIXI.Sprite(resources.grass.texture);
  tile.x = 0
  tile.y = 0
  tile.width = TILE_WIDTH
  tile.height = TILE_HEIGHT

  app.stage.addChild(tile);
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

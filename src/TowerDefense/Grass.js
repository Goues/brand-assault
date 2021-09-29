import * as PIXI from 'pixi.js'
import Tile from './Tile'
import Tower from './Tower'
import { TILE_WIDTH, TILE_HEIGHT } from './config'
import { buildTower } from '../towers'
import store from '../gameState'

class Grass extends Tile {
  constructor(tileX, tileY, stage) {
    super(PIXI.Texture.from('/grass_tile.jpg'), tileX, tileY);
    this.interactive = true
    this.buttonMode = true
    this.on('pointerdown', e => {
      const { x, y } = e.target
      const posX = x / TILE_WIDTH
      const posY = y / TILE_HEIGHT
      store.dispatch(buildTower(posX, posY))
      const tower = new Tower(posX, posY)
      stage.addChild(tower)
      stage.removeChild(this)
    });
  }
}

export default Grass;

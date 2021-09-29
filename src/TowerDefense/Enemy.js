import * as PIXI from 'pixi.js'
import { START_TILE, TILE_HEIGHT, TILE_WIDTH } from './config'

class Enemy extends PIXI.Sprite {
  constructor() {
    super(PIXI.Texture.from('/negative_comment.png'))
    this.x = START_TILE.x * TILE_WIDTH
    this.y = START_TILE.y * TILE_HEIGHT
    this.width = TILE_WIDTH
    this.height = TILE_HEIGHT
  }

  update(delta) {
    this.x += 10
  }
}

export default Enemy

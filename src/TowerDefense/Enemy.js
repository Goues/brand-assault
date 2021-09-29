import * as PIXI from 'pixi.js'
import { START_TILE, TILE_HEIGHT, TILE_WIDTH } from './config'

class Enemy extends PIXI.Sprite {
  constructor(app) {
    super(PIXI.Texture.from('/negative_comment.png'))
    this.x = app.screen.width / 2
    this.y = app.screen.height - 40
    this.anchor.x = 0.5
    this.anchor.y = 0.5
    this.velocity = 5
    this.scale.set(0.1, 0.1)
  }

  update(delta) {
    this.y -= this.velocity
  }
}

export default Enemy

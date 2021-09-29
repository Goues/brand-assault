import * as PIXI from 'pixi.js'
import { PATH, START_TILE, TILE_HEIGHT, TILE_WIDTH } from './config'

const PATH_TRESHOLD = 0.1

class Enemy extends PIXI.Sprite {
  constructor(app) {
    super(PIXI.Texture.from('/negative_comment.png'))
    this.x = START_TILE.x * TILE_WIDTH
    this.y = START_TILE.y * TILE_HEIGHT
    this.width = TILE_WIDTH
    this.height = TILE_HEIGHT
    this.nextPathIndex = 0
    this.done = false
    this.velocity = 5 // per 1s
  }

  update(delta) {
    // enemy went all the way to end
    if (this.done) return

    let node = PATH[this.nextPathIndex]
    let nodeX = node.x * TILE_WIDTH
    let nodeY = node.y * TILE_HEIGHT

    // check if we are already at the next node with a leeway of % of tile
    if (this.x > nodeX - TILE_WIDTH * PATH_TRESHOLD &&
      this.x < nodeX + TILE_WIDTH * PATH_TRESHOLD
      && this.y > nodeY - TILE_HEIGHT * PATH_TRESHOLD
      && this.y < nodeY + TILE_HEIGHT * PATH_TRESHOLD
    ) {
      this.nextPathIndex += 1

      if (this.nextPathIndex >= PATH.length) {
        // TODO(ales): Fire event - enemy is at the end - destory it and deduct points
        this.done = true
        return
      }
    }

    node = PATH[this.nextPathIndex]
    nodeX = node.x * TILE_WIDTH
    nodeY = node.y * TILE_HEIGHT

    const dx = nodeX - this.x
    const dy = nodeY - this.y
    const d = Math.sqrt((dx) ** 2 + (dy) ** 2)

    const normalizedX = dx / d
    const normalizedY = dy / d

    this.x += normalizedX * this.velocity * delta
    this.y += normalizedY * this.velocity * delta
  }
}

export default Enemy

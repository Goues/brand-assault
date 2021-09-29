import * as PIXI from 'pixi.js'
import { PATH, START_TILE, TILE_HEIGHT, TILE_WIDTH } from './config'
import store from '../gameState'
import { subtractCredits } from '../credits'
import { HIT_POINTS } from '../config'

const PATH_TRESHOLD = 0.1

class Enemy extends PIXI.Sprite {
  constructor(wave) {
    super(PIXI.Texture.from('/negative_comment.png'))
    this.x = START_TILE.x * TILE_WIDTH + Math.random() * 100
    this.y = START_TILE.y * TILE_HEIGHT
    this.width = TILE_WIDTH
    this.height = TILE_HEIGHT
    this.nextPathIndex = 0
    this.done = false
    this.velocity = 5 // per 1s
    this.hitpoints = Math.floor(HIT_POINTS.COMMENT.INITIAL * (HIT_POINTS.COMMENT.MULTIPLIER ** (wave - 1)))
    this.interactive = true
    this.buttonMode = true

    this.on('pointerdown', () => {
      this.hitpoints -= 10
      if (this.hitpoints <= 0) {
        this.destroy()
        return
      }
    })
  }

  update(delta) {
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
        store.dispatch(subtractCredits(this.hitpoints))
        this.destroy()
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

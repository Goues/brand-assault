import * as PIXI from 'pixi.js'
import Tile from './Tile'

class Grass extends Tile {
  constructor(tileX, tileY) {
    super(PIXI.Texture.from('/grass_tile.jpg'), tileX, tileY)
    this.interactive = true
    this.buttonMode = true
    this.on('pointerdown', (e) => {
      alert('clicked!' + e.target.x + ' ' + e.target.y)
    });
  }
}

export default Grass

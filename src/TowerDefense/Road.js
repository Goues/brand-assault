import * as PIXI from 'pixi.js'
import Tile from './Tile'

class Grass extends Tile {
  constructor(tileX, tileY) {
    super(PIXI.Texture.from('/road_tile.jpg'), tileX, tileY)
  }
}

export default Grass

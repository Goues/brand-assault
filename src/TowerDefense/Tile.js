import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";

class Tile extends PIXI.Sprite {
  constructor(texture, tileX, tileY) {
    super(texture);
    this.x = tileX * TILE_WIDTH;
    this.y = tileY * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;
  }
}

export default Tile;

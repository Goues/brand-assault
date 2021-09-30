import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";

class Tile extends PIXI.Sprite {
  constructor(texture, { x, y }) {
    super(texture);
    this.grid = { x, y };
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
  }
}

export default Tile;

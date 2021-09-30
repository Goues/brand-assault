import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";

class Tile extends PIXI.Sprite {
  constructor(texture, { x, y }) {
    super(texture);
    this.grid = { x, y };
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;
    this.x = x * TILE_WIDTH + this.width / 2;
    this.y = y * TILE_HEIGHT + this.height / 2;
    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;
  }
}

export default Tile;

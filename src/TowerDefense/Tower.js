import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";

class Tower extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.Texture.from("/tower.png"));
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;
  }
}

export default Tower;

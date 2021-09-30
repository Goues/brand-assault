import * as PIXI from "pixi.js";
import Tile from "./Tile";
import Tower from "./Tower";
import { TILE_WIDTH, TILE_HEIGHT } from "./config";
import { buildTower } from "../towers";
import store from "../gameState";

class Grass extends Tile {
  constructor(tileX, tileY) {
    super(PIXI.Texture.from("/grass_tile.jpg"), tileX, tileY);
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", this.onClick);
    this.alpha = 0
  }

  onClick = e => {
    const {
      towers,
      products: { COMMUNITY }
    } = store.getState();
    if (towers.length >= COMMUNITY) return;

    const { x, y } = e.target;
    const posX = x / TILE_WIDTH;
    const posY = y / TILE_HEIGHT;
    store.dispatch(buildTower(posX, posY));
    const tower = new Tower(posX, posY);
    this.parent.addChild(tower);
    this.off("pointerdown", this.onClick);
  };
}

export default Grass;

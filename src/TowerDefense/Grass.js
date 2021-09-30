import * as PIXI from "pixi.js";
import Tile from "./Tile";
import Tower from "./Tower";
import { TILE_WIDTH, TILE_HEIGHT, TOWER_TYPES } from "./config";
import { buildTower } from "../towers";
import store from "../gameState";

class Grass extends Tile {
  constructor(path) {
    super(PIXI.Texture.from("/add_tower.png"), path);
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", this.onClick);
    this.alpha = 0;
    this.tower = null;
  }

  mouseover(e) {
    this.alpha = 1;
  }

  mouseout() {
    this.alpha = 0;
  }

  buildNewTower(e) {
    const {
      towers,
      products: { COMMUNITY }
    } = store.getState();
    if (towers.length >= COMMUNITY) return;

    const { x, y } = this.grid;
    store.dispatch(buildTower(x, y));
    const tower = new Tower(x, y, TOWER_TYPES.DEFAULT);
    this.tower = tower;
    this.parent.addChild(tower);
  }

  upgradeTower() {
    // Tower upgrade
  }

  onClick = e => {
    if (!this.tower) {
      this.buildNewTower(e);
      return;
    }
    this.upgradeTower(e);
  };
}

export default Grass;

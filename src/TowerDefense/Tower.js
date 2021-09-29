import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";
import { getCenter, isWithinRange } from "../utils";
import Bullet from "./Bullet";

class Tower extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.Texture.from("/tower.png"));
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;

    this.damage = 1; // temporary
    this.range = 3 * TILE_WIDTH; // temporary
    this.firingSpeed = 500; // temporary
    this.lifespan = 0; // temporary
    this.target = null; // temporary
  }

  getTarget() {
    if (this.target && this.target.destroyed) {
      this.target = null;
    }

    if (this.target) {
      if (!isWithinRange(this, this.target)) {
        this.target = null;
      }
    }

    if (!this.target) {
      this.target = Array.from(this.parent.wave.enemies).find(enemy => {
        return !enemy.destoryed && isWithinRange(this, enemy);
      });
    }

    if (!this.target) {
      return null;
    }

    if (this.target.destroyed) {
      return null;
    }

    return this.target;
  }

  update(delta) {
    this.lifespan += delta;

    while (this.lifespan >= this.firingSpeed) {
      this.lifespan -= this.firingSpeed;

      const target = this.getTarget();

      if (target) {
        const towerCenter = getCenter(this);
        this.parent.addChild(new Bullet(towerCenter, target));
      }
    }
  }
}

export default Tower;

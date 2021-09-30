import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH, TOWERS } from "./config";
import { getCenter, isWithinRange } from "../utils";
import Bullet from "./Bullet";

class Tower extends PIXI.Sprite {
  constructor(x, y, type) {
    super(PIXI.Texture.from("/tower.png"));
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;

    this.damage = TOWERS[type].damage
    this.chance = TOWERS[type].chance
    this.range = 3 * TILE_WIDTH; // temporary
    this.firingSpeed = TOWERS[type].firingSpeed; // temporary
    this.lifespan = 0; // temporary
    this.target = null; // temporary
  }

  shouldBeHit(enemy) {
    if (!this.chance || (!enemy.type in this.chance)) return true
    const random = Math.random()
    if (random <= this.chance[enemy.type]) {
      return true
    }
    return false
  }

  isValidTarget(enemy) {
    return (
      !enemy.destoryed &&
      enemy.traveled >= 0 &&
      enemy.type in this.damage &&
      this.shouldBeHit(enemy) &&
      isWithinRange(this, enemy)
    );
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
        return this.isValidTarget(enemy)
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
        this.parent.addChild(new Bullet(towerCenter, target, this.damage[target.type]));
      }
    }
  }
}

export default Tower;

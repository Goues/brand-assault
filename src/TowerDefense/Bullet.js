import * as PIXI from "pixi.js";
import { getDistanceFromCenters, getDistanceSquare } from "../utils";

class Bullet extends PIXI.Sprite {
  constructor(tower, target, damage) {
    super(PIXI.Texture.from("/bullet.png"));
    this.width = 20;
    this.height = 20;
    this.x = tower.x - this.width / 2;
    this.y = tower.y - this.height / 2;
    this.target = target;
    this.damage = damage;
    this.velocity = 1;
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2
		}

  }

  destroy() {
    this.target = null;
    super.destroy();
  }

  update(delta) {
    if (this.destroyed) {
      return;
    }
    if (this.target.destroyed) {
      return this.destroy();
    }
    const targetCenter = this.target.center;
    const bulletCenter = this.center;

    var tan =
      (targetCenter.y - bulletCenter.y) / (targetCenter.x - bulletCenter.x);
    var angle = Math.atan(tan);
    if (targetCenter.x < bulletCenter.x) angle += Math.PI;
    const moveBy = this.velocity * delta;
    if (
      getDistanceSquare(getDistanceFromCenters(targetCenter, bulletCenter)) <=
      moveBy * moveBy
    ) {
      this.target.hit(this.damage);
      this.destroy();
      return;
    }
    var moveByY = moveBy * Math.sin(angle);
    var moveByX = moveBy * Math.cos(angle);
    this.y += moveByY;
    this.x += moveByX;
		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2
		}
  }
}

export default Bullet;

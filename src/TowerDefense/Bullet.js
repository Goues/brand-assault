import * as PIXI from "pixi.js";
import { getCenter, getDistanceFromCenters, getDistanceLength } from "../utils";

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

    target.on("destroyed", () => this.destroy());
  }

  destroy() {
    super.destroy();
    this.destroy = () => {};
  }

  update(delta) {
    if (this.target.destroyed || this.destroyed) {
      return;
    }
    const targetCenter = getCenter(this.target);
    const bulletCenter = getCenter(this);

    var tan =
      (targetCenter.y - bulletCenter.y) / (targetCenter.x - bulletCenter.x);
    var angle = Math.atan(tan);
    if (targetCenter.x < bulletCenter.x) angle += Math.PI;
    const moveBy = this.velocity * delta;
    if (
      getDistanceLength(getDistanceFromCenters(targetCenter, bulletCenter)) <=
      moveBy
    ) {
      this.target.hit(this.damage);
      this.destroy();
      return;
    }
    var moveByY = moveBy * Math.sin(angle);
    var moveByX = moveBy * Math.cos(angle);
    this.y += moveByY;
    this.x += moveByX;
  }
}

export default Bullet;

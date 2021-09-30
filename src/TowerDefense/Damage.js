import * as PIXI from "pixi.js";
import { toFixedRound } from "../utils";

const LIFESPAN = 500;
const VELOCITY = 0.2;

class Hitpoints extends PIXI.Container {
  constructor(damage, enemy) {
    super();

    this.x = enemy.center.x;
    this.y = enemy.y - 25;

    this.text = new PIXI.Text(`-${toFixedRound(damage, 0)}`, {
      align: "center",
      fontFamily: "Arial",
      fill: ["#00F0F0"],
      fontSize: 12,
      fontWeight: "bold",
      lineJoin: "round"
    });
    this.text.anchor.set(0.5, 0.5);
    this.text.x = 0;
    this.text.y = 0;
    this.lifespan = LIFESPAN;

    this.addChild(this.text);
  }

  update(delta) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.destroy();
      return;
    }

    this.y -= VELOCITY;
    this.alpha = this.lifespan / LIFESPAN;
  }
}

export default Hitpoints;

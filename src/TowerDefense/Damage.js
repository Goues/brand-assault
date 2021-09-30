import * as PIXI from "pixi.js";
import { toFixedRound } from "../utils";

const LIFESPAN = 500;

class Hitpoints extends PIXI.Container {
  constructor(hitpoints) {
    super();

    this.x = 0;
    this.y = -20;

    this.text = new PIXI.Text(`-${toFixedRound(hitpoints, 0)}`, {
      fontFamily: "Arial",
      fill: ["#00F0F0"],
      fontSize: 35,
      fontWeight: "bold",
      lineJoin: "round"
    });
    this.text.x = 35;
    this.text.y = -25;
    this.lifespan = LIFESPAN;

    this.addChild(this.text);
  }

  update(delta, parent) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.destroy();
      return;
    }

    this.y -= 1;
    this.alpha = this.lifespan / LIFESPAN;
  }
}

export default Hitpoints;

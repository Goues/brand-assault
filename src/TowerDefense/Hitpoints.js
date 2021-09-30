import * as PIXI from "pixi.js";
import { toFixedRound } from "../utils";

const HEALTHBAR_WIDTH = 70;
const HEALTHBAR_HEIGHT = 10;

class Hitpoints extends PIXI.Container {
  constructor(hitpoints, maxHitpoints) {
    super();

    this.x = 0;
    this.y = -20;

    this.text = new PIXI.Text(toFixedRound(hitpoints, 0), {
      fontFamily: "Arial",
      fill: ["#00F0F0"],
      fontSize: 35,
      fontWeight: "bold",
      lineJoin: "round"
    });
    this.text.x = HEALTHBAR_WIDTH + 10;
    this.text.y = -15;

    this.bar = new PIXI.Graphics();

    this.bar.beginFill(0xff0000);
    this.bar.drawRect(0, 0, HEALTHBAR_WIDTH, HEALTHBAR_HEIGHT);
    this.bar.endFill();

    this.bar.beginFill(0x00ff00);
    this.bar.drawRect(
      0,
      0,
      (HEALTHBAR_WIDTH * hitpoints) / maxHitpoints,
      HEALTHBAR_HEIGHT
    );
    this.bar.endFill();

    this.addChild(this.bar);
    this.addChild(this.text);
  }

  update(delta, parent) {
    this.text.text = toFixedRound(parent.hitpoints, 0);

    this.bar.clear();

    this.bar.beginFill(0xff0000);
    this.bar.drawRect(0, 0, HEALTHBAR_WIDTH, HEALTHBAR_HEIGHT);
    this.bar.endFill();

    this.bar.beginFill(0x00ff00);
    this.bar.drawRect(
      0,
      0,
      (HEALTHBAR_WIDTH * parent.hitpoints) / parent.maxHitpoints,
      HEALTHBAR_HEIGHT
    );
    this.bar.endFill();

    for (const child of this.children) {
      if (child.update) child.update(delta, this);
    }
  }
}

export default Hitpoints;

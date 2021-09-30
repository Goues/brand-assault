import * as PIXI from "pixi.js";
import { toFixedRound } from "../utils";
import { TILE_HEIGHT } from "./config";

const HEALTHBAR_WIDTH = 10;
const HEALTHBAR_HEIGHT = 70;

class Hitpoints extends PIXI.Container {
  constructor(hp, maxHp, enemy) {
    super();

    this.size = enemy.size / (TILE_HEIGHT / 2);
    this.x = 65 * this.size;
    this.y = 0;
    this.alpha = 0.5;

    this.text = new PIXI.Text(toFixedRound(hp, 0), {
      align: "center",
      fontFamily: "Arial",
      fill: ["#00F0F0"],
      fontSize: 20,
      fontWeight: "bold",
      lineJoin: "round"
    });
    this.text.anchor.set(0.5, 0.5);
    this.text.x = 0;
    this.text.y = -20;

    this.bar = new PIXI.Graphics();
    this.status = new PIXI.Graphics();

    this.mount();
    this.draw(hp, hp / maxHp);
  }

  mount() {
    this.bar.beginFill(0xffffff);
    this.bar.drawRoundedRect(
      -4,
      -4,
      HEALTHBAR_WIDTH + 8,
      HEALTHBAR_HEIGHT * this.size + 8,
      16
    );
    this.bar.endFill();

    this.bar.beginFill(0xff0000);
    this.bar.drawRoundedRect(0, 0, HEALTHBAR_WIDTH, HEALTHBAR_HEIGHT, 8);
    this.bar.endFill();

    this.addChild(this.bar);
    this.addChild(this.text);
    this.addChild(this.status);
  }

  draw(hp, hpPercent) {
    this.prevHp = hp;
    this.text.text = toFixedRound(hp, 0);

    this.status.clear();
    this.status.beginFill(0x00ff00);
    this.status.drawRoundedRect(
      0,
      HEALTHBAR_HEIGHT * this.size * (1 - hpPercent),
      HEALTHBAR_WIDTH,
      HEALTHBAR_HEIGHT * this.size * hpPercent,
      8
    );
    this.status.endFill();
  }

  update(delta, parent) {
    if (parent.hitpoints === this.prevHp) {
      return;
    }
    this.draw(parent.hitpoints, parent.hitpoints / parent.maxHitpoints);
  }
}

export default Hitpoints;

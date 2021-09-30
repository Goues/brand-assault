import * as PIXI from "pixi.js";
import { GET_COMMENTS_FOR_WAVE, GET_COMMENTS_HP_FOR_WAVE } from "../config";
import Enemy from "./Enemy";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default class Wave extends PIXI.Container {
  constructor(index, onDestroyed) {
    super();
    this.index = index;
    this.onDestroyed = onDestroyed;

    this.comments = GET_COMMENTS_FOR_WAVE(index);
    this.hp = GET_COMMENTS_HP_FOR_WAVE(index);

    this.enemies = [];

    for (let i = 0; i < this.comments.NEGATIVE; i++) {
      this.enemies.push(["negative", this.hp.comment]);
    }

    for (let i = 0; i < this.comments.NEUTRAL; i++) {
      this.enemies.push(["neutral", this.hp.comment]);
    }

    for (let i = 0; i < this.comments.POSITIVE; i++) {
      this.enemies.push(["positive", this.hp.comment]);
    }

    shuffleArray(this.enemies);

    if (index % 10 === 5) {
      this.enemies.push(["hater", this.hp.hater]);
    }

    if (index % 10 === 0) {
      this.enemies.push(["influencer", this.hp.influencer]);
    }

    this.enemies = new Set(
      this.enemies.map(([type, hp], index) => {
        const enemy = new Enemy(type, hp, index);
        enemy.on("destroyed", () => {
          this.onEnemyDestroy(enemy);
        });
        this.addChild(enemy);
        return enemy;
      })
    );

    console.debug(this);
  }

  onEnemyDestroy(enemy) {
    this.enemies.delete(enemy);

    if (this.enemies.size === 0) {
      this.destroy();
    }
  }
}
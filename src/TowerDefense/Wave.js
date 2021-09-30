import * as PIXI from "pixi.js";
import {
  GET_COMMENTS_FOR_WAVE,
  GET_COMMENTS_HP_FOR_WAVE,
  GET_AUDIENCES_CHANCE
} from "../config";
import Enemy from "./Enemy";
import store from "../gameState";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default class Wave extends PIXI.Container {
  constructor(index) {
    super();
    this.index = index;

    const {
      PUBLISHER: publisher,
      AUDIENCES: audiences
    } = store.getState().products;

    this.comments = GET_COMMENTS_FOR_WAVE(index);
    this.hp = GET_COMMENTS_HP_FOR_WAVE(index, publisher);

    this.enemies = [];

    for (let i = 0; i < this.comments.NEGATIVE; i++) {
      const isConverted = GET_AUDIENCES_CHANCE(audiences);
      const type = isConverted ? "neutral" : "negative";
      this.enemies.push([type, this.hp.comment]);
    }

    for (let i = 0; i < this.comments.NEUTRAL; i++) {
      this.enemies.push(["neutral", this.hp.comment]);
    }

    for (let i = 0; i < this.comments.POSITIVE; i++) {
      this.enemies.push(["positive", this.hp.positive]);
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

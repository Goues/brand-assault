import * as PIXI from "pixi.js";
import {
  PATH,
  START_TILE,
  TILE_HEIGHT,
  TILE_WIDTH,
  DIRECTIONS
} from "./config";
import store from "../gameState";
import { addCredits, subtractCredits } from "../credits";
import Hitpoints from "./Hitpoints";

const IMAGE = {
  negative: "/comment_negative.png",
  neutral: "/comment_neutral.png",
  positive: "/comment_positive.png",
  hater: "/hater.png", // miniboss
  influencer: "/influencer.png" // boss
};

const SIZE = {
  negative: TILE_WIDTH / 2,
  neutral: TILE_WIDTH / 2,
  positive: TILE_WIDTH / 2,
  hater: (TILE_WIDTH * 2) / 3, // miniboss
  influencer: TILE_WIDTH // boss
};

class Enemy extends PIXI.Sprite {
  constructor(type, hitpoints, delay) {
    super(PIXI.Texture.from(IMAGE[type]));
    this.size = SIZE[type];
    this.offset = {
      x: (TILE_WIDTH - this.size) / 2,
      y: (TILE_HEIGHT - this.size) / 2
    };
    this.type = type;
    this.x = START_TILE.x * TILE_WIDTH + this.offset.x;
    this.y = (START_TILE.y - 1) * TILE_HEIGHT + this.offset.y;
    this.width = SIZE[type];
    this.height = SIZE[type];
    this.nextPathIndex = 0;
    this.velocity = 0.1; // per 1s
    this.maxHitpoints = hitpoints;
    this.hitpoints = hitpoints;
    this.interactive = true;
    this.buttonMode = true;
    this.traveled = 0 - (delay * 100 + Math.random() * 50);

    this.on("pointerdown", () => {
      this.hit(1);
    });

    const hp = new Hitpoints(this.hitpoints);
    this.addChild(hp);
  }

  hit(damage) {
    this.hitpoints -= damage;
    if (this.hitpoints <= 0) {
      this.destroy();
      return;
    }
  }

  update(delta) {
    if (this.destroyed) return;

    this.traveled += delta * this.velocity;

    if (this.traveled < 0) {
      return;
    }

    let pathIndex = Math.floor(this.traveled / TILE_WIDTH);

    if (pathIndex >= PATH.length) {
      switch (this.type) {
        case "positive":
          store.dispatch(addCredits(this.hitpoints));
          this.destroy();
          break;
        case "neutral":
          this.x = START_TILE.x * TILE_WIDTH + this.offset.x;
          this.y = (START_TILE.y - 1) * TILE_HEIGHT + this.offset.y;
          this.type = "negative";
          this.texture = PIXI.Texture.from(IMAGE[this.type]);
          this.nextPathIndex = 0;
          break;
        default:
          store.dispatch(subtractCredits(this.hitpoints));
          this.destroy();
          break;
      }
      return;
    }

    let remainder = this.traveled % TILE_WIDTH;
    let firstHalf = remainder <= TILE_WIDTH / 2;
    let node = PATH[pathIndex];
    let x = node.x * TILE_WIDTH + this.offset.x;
    let y = node.y * TILE_WIDTH + this.offset.y;

    remainder = remainder - TILE_WIDTH / 2;
    if (!firstHalf) {
      remainder *= -1;
    }

    switch (firstHalf ? node.from : node.to) {
      case DIRECTIONS.TOP:
        y += remainder;
        break;
      case DIRECTIONS.BOTTOM:
        y -= remainder;
        break;
      case DIRECTIONS.LEFT:
        x += remainder;
        break;
      case DIRECTIONS.RIGHT:
        x -= remainder;
        break;
      default:
        break;
    }

    this.x = x;
    this.y = y;

    for (const child of this.children) {
      if (child.update) child.update(delta, this);
    }
  }

  destroy() {
    if (this.destroyed) return;

    super.destroy();
  }
}

export default Enemy;

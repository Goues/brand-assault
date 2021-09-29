import * as PIXI from "pixi.js";
import { PATH, START_TILE, TILE_HEIGHT, TILE_WIDTH } from "./config";
import store from "../gameState";
import { addCredits, subtractCredits } from "../credits";
import Hitpoints from "./Hitpoints";

const PATH_TRESHOLD = 0.1;

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
    this.hitpoints = hitpoints;
    this.interactive = true;
    this.buttonMode = true;
    this.delay = delay * 900 + Math.random() * 200;

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

    // mimic delay between enemies
    if (this.delay > 0) {
      this.delay -= delta;
      if (this.delay < 0) {
        delta = this.delay * -1;
      } else {
        return;
      }
    }

    let node = PATH[this.nextPathIndex];
    let nodeX = node.x * TILE_WIDTH + this.offset.x;
    let nodeY = node.y * TILE_HEIGHT + this.offset.y;

    // check if we are already at the next node with a leeway of % of tile
    if (
      this.x > nodeX - TILE_WIDTH * PATH_TRESHOLD &&
      this.x < nodeX + TILE_WIDTH * PATH_TRESHOLD &&
      this.y > nodeY - TILE_HEIGHT * PATH_TRESHOLD &&
      this.y < nodeY + TILE_HEIGHT * PATH_TRESHOLD
    ) {
      this.nextPathIndex += 1;

      if (this.nextPathIndex >= PATH.length) {
        switch (this.type) {
          case "positive":
            store.dispatch(addCredits(this.hitpoints));
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
            return;
        }
      }
    } else {
      const dx = nodeX - this.x;
      const dy = nodeY - this.y;
      const d = Math.sqrt(dx ** 2 + dy ** 2);

      const normalizedX = dx / d;
      const normalizedY = dy / d;

      this.x += normalizedX * this.velocity * delta;
      this.y += normalizedY * this.velocity * delta;
    }

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

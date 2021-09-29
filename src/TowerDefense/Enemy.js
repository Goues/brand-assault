import * as PIXI from "pixi.js";
import { PATH, START_TILE, TILE_HEIGHT, TILE_WIDTH } from "./config";
import store from "../gameState";
import { subtractCredits } from "../credits";
import Hitpoints from "./Hitpoints";

const PATH_TRESHOLD = 0.1;

const IMAGE = {
  negative: "/comment_negative.png",
  neutral: "/comment_neutral.png",
  positive: "/comment_positive.png"
};

class Enemy extends PIXI.Sprite {
  constructor(hitpoints, type, delay) {
    super(PIXI.Texture.from(IMAGE[type]));
    this.type = type;
    this.x = START_TILE.x * TILE_WIDTH;
    this.y = (START_TILE.y - 1) * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;
    this.nextPathIndex = 0;
    this.velocity = 0.1; // per 1s
    this.hitpoints = hitpoints;
    this.interactive = true;
    this.buttonMode = true;
    this.delay = delay * 1000;

    this.on("pointerdown", () => {
      this.hitpoints -= 2;
      if (this.hitpoints <= 0) {
        this.destroy();
        return;
      }
    });

    const hp = new Hitpoints(this.hitpoints);
    this.addChild(hp);
  }

  update(delta) {
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
    let nodeX = node.x * TILE_WIDTH;
    let nodeY = node.y * TILE_HEIGHT;

    // check if we are already at the next node with a leeway of % of tile
    if (
      this.x > nodeX - TILE_WIDTH * PATH_TRESHOLD &&
      this.x < nodeX + TILE_WIDTH * PATH_TRESHOLD &&
      this.y > nodeY - TILE_HEIGHT * PATH_TRESHOLD &&
      this.y < nodeY + TILE_HEIGHT * PATH_TRESHOLD
    ) {
      this.nextPathIndex += 1;

      if (this.nextPathIndex >= PATH.length) {
        store.dispatch(subtractCredits(this.hitpoints));
        this.destroy();
        return;
      }
    }

    node = PATH[this.nextPathIndex];
    nodeX = node.x * TILE_WIDTH;
    nodeY = node.y * TILE_HEIGHT;

    const dx = nodeX - this.x;
    const dy = nodeY - this.y;
    const d = Math.sqrt(dx ** 2 + dy ** 2);

    const normalizedX = dx / d;
    const normalizedY = dy / d;

    this.x += normalizedX * this.velocity * delta;
    this.y += normalizedY * this.velocity * delta;

    for (const child of this.children) {
      if (child.update) child.update(delta, this);
    }
  }
}

export default Enemy;

import * as PIXI from "pixi.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config";

function getCenter({ x, y, width, height }) {
  return { x: (x + width) / 2, y: (y + height) / 2 };
}

function getDistance(tower, object) {
  const towerCenter = getCenter(tower);
  const objectCenter = getCenter(object);
  return {
    x: Math.abs(towerCenter.x - objectCenter.x),
    y: Math.abs(towerCenter.y - objectCenter.y)
  };
}

function isWithinRange(tower, object) {
  const distance = getDistance(tower, object);
  return (
    distance.x * distance.x + distance.y * distance.y <=
    tower.range * tower.range
  );
}

class Tower extends PIXI.Sprite {
  constructor(x, y) {
    super(PIXI.Texture.from("/tower.png"));
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.width = TILE_WIDTH;
    this.height = TILE_HEIGHT;

    this.damage = 1;
    this.range = 3 * TILE_WIDTH; // temporary
    this.firingSpeed = 500; // temporary
    this.lifespan = 0;
    this.target = null;
  }

  update(delta) {
    this.lifespan += delta;

    while (this.lifespan >= this.firingSpeed) {
      this.lifespan -= this.firingSpeed;

      if (this.target) {
        if (!isWithinRange(this, this.target)) {
          this.target = null;
        }
      }

      if (!this.target) {
        this.target = Array.from(this.parent.wave.enemies).find(enemy => {
          return isWithinRange(this, enemy);
        });
      }

      // TODO hit target
    }
  }
}

export default Tower;

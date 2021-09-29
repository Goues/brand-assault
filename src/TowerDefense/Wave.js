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

export default class Wave {
  constructor(index, onDestroyed) {
    this.onDestroyed = onDestroyed;

    const comments = GET_COMMENTS_FOR_WAVE(index);
    const hp = GET_COMMENTS_HP_FOR_WAVE(index);

    this.enemies = [];

    for (let i = 0; i < comments.NEGATIVE; i++) {
      this.enemies.push("negative");
    }

    for (let i = 0; i < comments.NEUTRAL; i++) {
      this.enemies.push("neutral");
    }

    for (let i = 0; i < comments.POSITIVE; i++) {
      this.enemies.push("positive");
    }

    shuffleArray(this.enemies);

    this.enemies = new Set(
      this.enemies.map((type, index) => {
        const object = new Enemy(hp, type, index);
        object.on("destroyed", () => {
          this.onEnemyDestroy(object);
        });
        return object;
      })
    );
  }

  onEnemyDestroy(enemy) {
    this.enemies.delete(enemy);

    if (this.enemies.size === 0) {
      this.onDestroyed();
    }
  }
}

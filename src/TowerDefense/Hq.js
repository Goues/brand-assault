import * as PIXI from "pixi.js";

class Hq extends PIXI.Sprite {
  constructor(app) {
    super(PIXI.Texture.from('/hq.png'));
    this.x = app.screen.width / 2 - 30;
    this.y = app.screen.height / 2 + 20;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.width = 60;
    this.height = 60;
  }

  update(delta) {
    //pass
  }

}

export default Hq


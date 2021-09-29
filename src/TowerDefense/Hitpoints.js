import * as PIXI from "pixi.js";

class Hitpoints extends PIXI.Text {
  constructor(hitpoints) {
    super(
      hitpoints,
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fill: ["#FF0000"],
        fontSize: 10,
        lineJoin: "round"
      })
    );

    this.x = 10;
    this.y = 10;
  }

  update(delta, parent) {
    this.text = parent.hitpoints;
  }
}

export default Hitpoints;

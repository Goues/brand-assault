import * as PIXI from "pixi.js";
import Tile from './Tile'

class Hq extends Tile {
  constructor(path) {
  	super(PIXI.Texture.from("/hq.png"), path);
  }
}

export default Hq;

import * as PIXI from "pixi.js";
import * as config from "./config";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
export default new PIXI.Application({
  width: config.GAME_WIDTH,
  height: config.GAME_HEIGHT
  // transparent: true
});

import * as PIXI from "pixi.js";
import Tile from "./Tile";
import { DIRECTIONS } from "./config";

const getTexture = path => {
  switch (path.from + path.to) {
    case DIRECTIONS.TOP + DIRECTIONS.BOTTOM:
    case DIRECTIONS.BOTTOM + DIRECTIONS.TOP:
      return {
        file: "/path_line.png",
        angle: 0
      };
    case DIRECTIONS.LEFT + DIRECTIONS.RIGHT:
    case DIRECTIONS.RIGHT + DIRECTIONS.LEFT:
      return {
        file: "/path_line.png",
        angle: 270
      };
    case DIRECTIONS.TOP + DIRECTIONS.RIGHT:
    case DIRECTIONS.RIGHT + DIRECTIONS.TOP:
      return {
        file: "/path_corner.png",
        angle: 270
      };
    case DIRECTIONS.RIGHT + DIRECTIONS.BOTTOM:
    case DIRECTIONS.BOTTOM + DIRECTIONS.RIGHT:
      return {
        file: "/path_corner.png",
        angle: 0
      };
    case DIRECTIONS.BOTTOM + DIRECTIONS.LEFT:
    case DIRECTIONS.LEFT + DIRECTIONS.BOTTOM:
      return {
        file: "/path_corner.png",
        angle: 90
      };
    case DIRECTIONS.LEFT + DIRECTIONS.TOP:
    case DIRECTIONS.TOP + DIRECTIONS.LEFT:
      return {
        file: "/path_corner.png",
        angle: 180
      };
    default:
      throw new Error("bad");
  }
};

class Road extends Tile {
  constructor(path) {
    const { file, angle } = getTexture(path);
    super(PIXI.Texture.from(file), path);

    this.angle = angle;
  }
}

export default Road;

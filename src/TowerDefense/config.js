export {GAME_WIDTH,GAME_HEIGHT,TILES_X, TILES_Y, TILE_WIDTH, TILE_HEIGHT} from '../config'
 
export const START_TILE = { x: 1, y: 0 };

export const DIRECTIONS = {
  TOP: "↑",
  LEFT: "←",
  RIGHT: "→",
  BOTTOM: "↓"
};

export const PATH = [
  { x: 1, y: 0, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 1, y: 1, from: DIRECTIONS.TOP, to: DIRECTIONS.RIGHT },
  { x: 2, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 3, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 4, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 5, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 6, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 7, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 8, y: 1, from: DIRECTIONS.LEFT, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 2, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 3, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 4, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 5, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 6, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 7, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 8, y: 8, from: DIRECTIONS.TOP, to: DIRECTIONS.LEFT },
  { x: 7, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 6, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 5, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 4, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 3, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 2, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.TOP },
  { x: 2, y: 7, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
  { x: 2, y: 6, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
  { x: 2, y: 5, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
  { x: 2, y: 4, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
  { x: 2, y: 3, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.RIGHT },
  { x: 3, y: 3, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 4, y: 3, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 5, y: 3, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
  { x: 6, y: 3, from: DIRECTIONS.LEFT, to: DIRECTIONS.BOTTOM },
  { x: 6, y: 4, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 6, y: 5, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
  { x: 6, y: 6, from: DIRECTIONS.TOP, to: DIRECTIONS.LEFT },
  { x: 5, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
  { x: 4, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.TOP },
  { x: 4, y: 5, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP }
];

export const HQ = {
  x: 4,
  y: 4
};

export const MAP = PATH.reduce((map, path) => {
  const { x, y } = path;
  if (!map[x]) map[x] = {};
  map[x][y] = path;
  return map;
}, {});

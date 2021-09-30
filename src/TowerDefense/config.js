export const GAME_WIDTH = 600;
export const GAME_HEIGHT = 600;
export const TILES_X = 10;
export const TILES_Y = 10;
export const TILE_WIDTH = GAME_WIDTH / TILES_X;
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y;

export const START_TILE = { x: 1, y: 0 };

export const MAP_1 = [
  //X 0    1    2    3    4    5    6    7    8    9       Y
  ["-", "x", "-", "-", "-", "-", "-", "-", "-", "-"], // 0
  ["-", "x", "x", "x", "x", "x", "x", "x", "x", "-"], // 1
  ["-", "-", "-", "-", "-", "-", "-", "-", "x", "-"], // 2
  ["-", "-", "x", "x", "x", "x", "x", "-", "x", "-"], // 3
  ["-", "-", "x", "-", "-", "-", "x", "-", "x", "-"], // 4
  ["-", "-", "x", "-", "x", "-", "x", "-", "x", "-"], // 5
  ["-", "-", "x", "-", "x", "x", "x", "-", "x", "-"], // 6
  ["-", "-", "x", "-", "-", "-", "-", "-", "x", "-"], // 7
  ["-", "-", "x", "x", "x", "x", "x", "x", "x", "-"], // 8
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"] // 9
];

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
  WIDTH: 60,
  HEIGTH: 60
};

export const TOWER_TYPES = {
  DEFAULT: "DEFAULT",
  QUICK_TO_BAN_AGENT: "QUICK_TO_BAN_AGENT",
  PURGER: "PURGER",
  OPTIMIST: "OPTIMIST",
  POWER_USER: "POWER_USER",
  BUSY_BEE: "BUSY_BEE"
};

export const TOWERS = {
  DEFAULT: {
    damage: {
      negative: 1,
      neutral: 1,
      hater: 1,
      influencer:1
    },
    firingSpeed: 500,
  },
  QUICK_TO_BAN_AGENT: {
    damage: {
      negative: 1,
      positive: 1,
      neutral: 1,
      hater: 1,
      infuencer: 1
    },
    firingSpeed: 500
  },
  PURGER: {
    damage: {
      negative: 2,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 500
  },
  OPTIMIST: {
    damage: {
      negative: 1,
      neutral: 1,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 500
  },
  POWER_USER: {
    damage: {
      negative: 1,
      neutral: 1,
      positive: 1,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 500
  },
  BUSY_BEE: {
    damage: {
      negative: 1,
      neutral: 1,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 1000
  }
};

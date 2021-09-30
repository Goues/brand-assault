export const GAME_WIDTH = 600;
export const GAME_HEIGHT = 600;
export const TILES_X = 10;
export const TILES_Y = 10;
export const TILE_WIDTH = GAME_WIDTH / TILES_X;
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y;

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
    cost: 0
  },
  QUICK_TO_BAN_AGENT: {
    damage: {
      negative: 1,
      positive: 1,
      neutral: 1,
      hater: 1,
      infuencer: 1
    },
    chance: {
      positive: 0.3
    },
    firingSpeed: 500,
    cost: 20
  },
  PURGER: {
    damage: {
      negative: 2,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 500,
    cost: 30
  },
  OPTIMIST: {
    damage: {
      negative: 1,
      neutral: 1,
      hater: 1,
      influencer: 1
    },
    slow: {
      negative: 0.5
    },
    firingSpeed: 500,
    cost: 20
  },
  POWER_USER: {
    damage: {
      negative: 1,
      neutral: 1,
      positive: 1,
      hater: 1,
      influencer: 1
    },
    firingSpeed: 1250,
    cost: 50,
    attackArea: true
  },
  BUSY_BEE: {
    damage: {
      negative: 1,
      neutral: 1,
      hater: 1,
      influencer: 1
    },
    cost: 30,
    firingSpeed: 250
  }
};

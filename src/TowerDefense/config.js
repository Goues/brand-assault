export const GAME_WIDTH = 800
export const GAME_HEIGHT = 800
export const TILES_X = 10
export const TILES_Y = 10
export const TILE_WIDTH = GAME_WIDTH / TILES_X
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y

export const START_TILE = {x: 1, y: 0}

export const MAP_1 = [
  ['-', 'x', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', 'x', '-'],
  ['-', '-', 'x', 'x', 'x', 'x', 'x', '-', 'x', '-'],
  ['-', '-', 'x', '-', '-', '-', 'x', '-', 'x', '-'],
  ['-', '-', 'x', '-', 'x', '-', 'x', '-', 'x', '-'],
  ['-', '-', 'x', '-', 'x', 'x', 'x', '-', 'x', '-'],
  ['-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'],
  ['-', '-', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
]

export const LEVEL_1 = {
  startAt: 0,
  enemies: 10
}
export const LEVEL_2 = {
  startAt: 5,
  enemies: 10
}
export const LEVEL_3 = {
  startAt: 10,
  enemies: 10
}

export const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3]

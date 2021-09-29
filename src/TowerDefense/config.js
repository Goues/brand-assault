export const GAME_WIDTH = 800
export const GAME_HEIGHT = 800
export const TILES_X = 10
export const TILES_Y = 10
export const TILE_WIDTH = GAME_WIDTH / TILES_X
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y

export const START_TILE = {x: 1, y: 0}

export const MAP_1 = [
//X 0    1    2    3    4    5    6    7    8    9       Y
  ['-', 'x', '-', '-', '-', '-', '-', '-', '-', '-'], // 0
  ['-', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '-'], // 1
  ['-', '-', '-', '-', '-', '-', '-', '-', 'x', '-'], // 2
  ['-', '-', 'x', 'x', 'x', 'x', 'x', '-', 'x', '-'], // 3
  ['-', '-', 'x', '-', '-', '-', 'x', '-', 'x', '-'], // 4
  ['-', '-', 'x', '-', 'x', '-', 'x', '-', 'x', '-'], // 5
  ['-', '-', 'x', '-', 'x', 'x', 'x', '-', 'x', '-'], // 6
  ['-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'], // 7
  ['-', '-', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '-'], // 8
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], // 9
]

export const PATH = [
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 2, y: 1},
  {x: 3, y: 1},
  {x: 4, y: 1},
  {x: 5, y: 1},
  {x: 6, y: 1},
  {x: 7, y: 1},
  {x: 8, y: 1},
  {x: 8, y: 2},
  {x: 8, y: 3},
  {x: 8, y: 4},
  {x: 8, y: 5},
  {x: 8, y: 6},
  {x: 8, y: 7},
  {x: 8, y: 8},
  {x: 7, y: 8},
  {x: 6, y: 8},
  {x: 5, y: 8},
  {x: 4, y: 8},
  {x: 3, y: 8},
  {x: 2, y: 8},
  {x: 2, y: 7},
  {x: 2, y: 6},
  {x: 2, y: 5},
  {x: 2, y: 4},
  {x: 2, y: 3},
  {x: 3, y: 3},
  {x: 4, y: 3},
  {x: 5, y: 3},
  {x: 6, y: 3},
  {x: 6, y: 4},
  {x: 6, y: 5},
  {x: 6, y: 6},
  {x: 5, y: 6},
  {x: 4, y: 6},
  {x: 4, y: 5},
]

export const LEVEL_1 = {
  startAt: 0,
  enemies: 10
}
export const LEVEL_2 = {
  startAt: 15,
  enemies: 10
}
export const LEVEL_3 = {
  startAt: 30,
  enemies: 10
}

export const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3]

export { GAME_WIDTH, GAME_HEIGHT, TILES_X, TILES_Y, TILE_WIDTH, TILE_HEIGHT } from '../config'

export const DIRECTIONS = {
	TOP: '↑',
	LEFT: '←',
	RIGHT: '→',
	BOTTOM: '↓',
}

export const PATH = [
	{ x: 8, y: 10, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 8, y: 9, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.RIGHT },
	{ x: 9, y: 9, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 10, y: 9, from: DIRECTIONS.LEFT, to: DIRECTIONS.TOP },
	{ x: 10, y: 8, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 10, y: 7, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 10, y: 6, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.LEFT },
	{ x: 9, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 8, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 7, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 6, y: 6, from: DIRECTIONS.RIGHT, to: DIRECTIONS.BOTTOM },
	{ x: 6, y: 7, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
	{ x: 6, y: 8, from: DIRECTIONS.TOP, to: DIRECTIONS.LEFT },
	{ x: 5, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 4, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 3, y: 8, from: DIRECTIONS.RIGHT, to: DIRECTIONS.BOTTOM },
	{ x: 3, y: 9, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
	{ x: 3, y: 10, from: DIRECTIONS.TOP, to: DIRECTIONS.LEFT },
	{ x: 2, y: 10, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 1, y: 10, from: DIRECTIONS.RIGHT, to: DIRECTIONS.TOP },
	{ x: 1, y: 9, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 1, y: 8, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 1, y: 7, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.RIGHT },
	{ x: 2, y: 7, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 3, y: 7, from: DIRECTIONS.LEFT, to: DIRECTIONS.TOP },
	{ x: 3, y: 6, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 3, y: 5, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.LEFT },
	{ x: 2, y: 5, from: DIRECTIONS.RIGHT, to: DIRECTIONS.TOP },
	{ x: 2, y: 4, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 2, y: 3, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 2, y: 2, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.RIGHT },
	{ x: 3, y: 2, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 4, y: 2, from: DIRECTIONS.LEFT, to: DIRECTIONS.BOTTOM },
	{ x: 4, y: 3, from: DIRECTIONS.TOP, to: DIRECTIONS.BOTTOM },
	{ x: 4, y: 4, from: DIRECTIONS.TOP, to: DIRECTIONS.RIGHT },
	{ x: 5, y: 4, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 6, y: 4, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 7, y: 4, from: DIRECTIONS.LEFT, to: DIRECTIONS.RIGHT },
	{ x: 8, y: 4, from: DIRECTIONS.LEFT, to: DIRECTIONS.TOP },
	{ x: 8, y: 3, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.TOP },
	{ x: 8, y: 2, from: DIRECTIONS.BOTTOM, to: DIRECTIONS.LEFT },
	{ x: 7, y: 2, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 6, y: 2, from: DIRECTIONS.RIGHT, to: DIRECTIONS.LEFT },
	{ x: 5, y: 2, from: DIRECTIONS.RIGHT, to: DIRECTIONS.TOP },
]

export const HQ = {
	x: 5,
	y: 1,
}

export const MAP = PATH.reduce((map, path) => {
	const { x, y } = path
	if (!map[x]) map[x] = {}
	map[x][y] = path
	return map
}, {})

import * as PIXI from 'pixi.js'
import Tile from './Tile'
import { DIRECTIONS } from './config'

const LINE = '/path_line.png'
const CORNER_INSIDE = '/path_corner_inside.png'
const CORNER_OUTSIDE = '/path_corner_outside.png'

const getTexture = (path) => {
	switch (path.from + path.to) {
		case DIRECTIONS.TOP + DIRECTIONS.BOTTOM:
			return { file: LINE, rotate: 8 }
		case DIRECTIONS.BOTTOM + DIRECTIONS.TOP:
			return { file: LINE, rotate: 4 }
		case DIRECTIONS.LEFT + DIRECTIONS.RIGHT:
			return { file: LINE, rotate: 2 }
		case DIRECTIONS.RIGHT + DIRECTIONS.LEFT:
			return { file: LINE, rotate: 10 }
		case DIRECTIONS.RIGHT + DIRECTIONS.TOP:
			return { file: CORNER_INSIDE, rotate: 6 }
		case DIRECTIONS.RIGHT + DIRECTIONS.BOTTOM:
			return { file: CORNER_OUTSIDE, rotate: 4 }
		case DIRECTIONS.BOTTOM + DIRECTIONS.RIGHT:
			return { file: CORNER_INSIDE, rotate: 4 }
		case DIRECTIONS.BOTTOM + DIRECTIONS.LEFT:
			return { file: CORNER_OUTSIDE, rotate: 2 }
		case DIRECTIONS.LEFT + DIRECTIONS.BOTTOM:
			return { file: CORNER_INSIDE, rotate: 2 }
		case DIRECTIONS.LEFT + DIRECTIONS.TOP:
			return { file: CORNER_OUTSIDE, rotate: 0 }
		case DIRECTIONS.TOP + DIRECTIONS.LEFT:
			return { file: CORNER_INSIDE, rotate: 0 }
		case DIRECTIONS.TOP + DIRECTIONS.RIGHT:
			return { file: CORNER_OUTSIDE, rotate: 6 }
		default:
			throw new Error('bad')
	}
}

class Road extends Tile {
	constructor(path) {
		const { file, rotate } = getTexture(path)

		const texture = PIXI.Texture.from(file)
		let rotatedTexture
		if (rotate) {
			const { frame } = texture
			const crop = new PIXI.Rectangle(frame.x, frame.y, 60, 60)
			const trim = crop
			rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate)
		} else {
			rotatedTexture = texture
		}

		super(rotatedTexture, path)
	}
}

export default Road

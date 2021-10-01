import { BASE_TOWER } from './config'

const ACTIONS = {
	BUILD: 'tower/build',
	UPGRADE: 'tower/upgrade',
}

export const buildTower = (x, y) => ({
	type: ACTIONS.BUILD,
	payload: { x, y },
})

export const upgradeTower = (x, y) => ({
	type: ACTIONS.UPGRADE,
	payload: { x, y },
})

const INITIAL_STATE = []

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTIONS.BUILD: {
			const { x, y } = action.payload
			return [
				...state,
				{
					level: 1,
					x,
					y,
				},
			]
		}
		case ACTIONS.UPGRADE: {
			const { x, y } = action.payload
			return state.map((tower) => {
				if (tower.x === x && tower.y === y) {
					return { ...tower, level: tower.level + 1 }
				}
				return tower
			})
		}
		default:
			return state
	}
}

export const getTotalTowerPointSpent = (state) => {
	let total = 0

	state.towers.forEach((tower) => {
		total += BASE_TOWER.GET_TOKENS(tower.level)
	})

	return total
}

export const getTotalTowerPointAvailable = (state) => {
	return state.products.COMMUNITY
}

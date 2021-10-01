import { BASE_TOWER } from './config'

const ACTIONS = {
	BUILD: 'tower/build',
}

export const buildTower = (x, y) => ({
	type: ACTIONS.BUILD,
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

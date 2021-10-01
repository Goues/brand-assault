export const ACTIONS = {
	ADD: 'credits/add',
	SUBTRACT: 'credits/subtract',
}

export const addCredits = (amount) => ({
	type: ACTIONS.ADD,
	payload: amount,
})

export const subtractCredits = (amount) => ({
	type: ACTIONS.SUBTRACT,
	payload: amount,
})

export const isGameOver = (state) => state.credits < 0

export const reducer = (state = 10000, action) => {
	switch (action.type) {
		case ACTIONS.ADD:
			return state + action.payload
		case ACTIONS.SUBTRACT:
			return state - action.payload
		default:
			return state
	}
}

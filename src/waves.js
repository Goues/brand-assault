export const ACTIONS = {
	SET_CURRENT: 'waves/setCurrent',
	SET_SURVIVED: 'waves/setSurvived',
	INCREMENT_SURVIVED: 'waves/incrementSurvivied',
	SET_REMAINING_ENEMIES: 'waves/setRemainingEnemies',
}

export const setCurrent = (wave) => ({
	type: ACTIONS.SET_CURRENT,
	payload: wave,
})

export const setSurvived = (wave) => ({
	type: ACTIONS.SET_SURVIVED,
	payload: wave,
})

export const incrementSurvived = () => ({
	type: ACTIONS.INCREMENT_SURVIVED,
})

export const setRemainingEnemies = (count) => ({
	type: ACTIONS.SET_REMAINING_ENEMIES,
	count,
})

const INITIAL_STATE = {
	current: 0,
	survived: 0,
	remainingEnemies: 0,
}

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTIONS.SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case ACTIONS.SET_SURVIVED:
			return {
				...state,
				survived: action.payload,
			}
		case ACTIONS.INCREMENT_SURVIVED:
			return {
				...state,
				survived: state.survived + 1,
			}
		case ACTIONS.SET_REMAINING_ENEMIES:
			return {
				...state,
				remainingEnemies: action.count,
			}
		default:
			return state
	}
}

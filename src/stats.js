export const ACTIONS = {
	INCREMENT_ENEMIES_KILLED: 'waves/incrementEnemiesKilled',
	INCREMENT_ENEMIES_LEAKED: 'waves/incrementEnemiesLeaked',
	INCREMENT_CREDIT_LOST: 'waves/incrementCreditLost',
}

export const incrementEnemiesKilled = () => ({
	type: ACTIONS.INCREMENT_ENEMIES_KILLED,
})

export const incrementEnemiesLeaked = () => ({
	type: ACTIONS.INCREMENT_ENEMIES_LEAKED,
})

export const incrementCreditsLost = (amount) => ({
	type: ACTIONS.INCREMENT_CREDIT_LOST,
	amount,
})

const INITIAL_STATE = {
	enemiesKilled: 0,
	enemiesLeaked: 0,
	creditsLost: 0,
}

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTIONS.INCREMENT_ENEMIES_KILLED:
			return {
				...state,
				enemiesKilled: state.enemiesKilled + 1,
			}
		case ACTIONS.INCREMENT_ENEMIES_LEAKED:
			return {
				...state,
				enemiesLeaked: state.enemiesLeaked + 1,
			}
		case ACTIONS.INCREMENT_CREDIT_LOST:
			return {
				...state,
				creditsLost: state.creditsLost - action.amount,
			}
		default:
			return state
	}
}

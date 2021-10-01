export const ACTIONS = {
	SET_LEADERBOARD: 'leaderboard/setLeaderboard',
}

export const setLeaderboard = (list) => (dispatch, getState) => {
	localStorage.setItem('leaderboard', JSON.stringify(list))
	dispatch({ type: ACTIONS.SET_LEADERBOARD, list })
}

export const addToLeaderboard = (item) => (dispatch, getState) => {
	const list = [...getState().leaderboard.list, item].sort((a, b) => b.score - a.score).slice(0, 10)
	const madeItToLeaderboard = !!list.find((i) => i === item)
	localStorage.setItem('leaderboard', JSON.stringify(list))
	dispatch({ type: ACTIONS.SET_LEADERBOARD, list, madeItToLeaderboard: madeItToLeaderboard })
}

let list = []
try {
	list = JSON.parse(localStorage.getItem('leaderboard'))
	if (!Array.isArray(list) || list.some((item) => !item.name || !Number.isFinite(item.score))) {
		list = []
	}
} catch (err) {
	list = []
}

console.group('Leaderboard')
for (const item of list) {
	console.log('Name: s%   Score: %s', item.name, item.score)
}
console.groupEnd()

const INITIAL_STATE = {
	madeItToLeaderboard: false,
	list,
}

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTIONS.SET_LEADERBOARD:
			return { ...state, list: action.list, madeItToLeaderboard: action.madeItToLeaderboard }
		default:
			return state
	}
}

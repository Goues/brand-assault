export const ACTIONS = {
	SET_LEADERBOARD: 'leaderboard/setLeaderboard',
}

export const setLeaderboard = (list) => (dispatch, getState) => {
	localStorage.setItem('leaderboard', JSON.stringify(list))
	dispatch({ type: ACTIONS.SET_LEADERBOARD, list })
}

export const addToLeaderboard = (item) => (dispatch, getState) => {
	const list = [...getState().leaderboard, item].sort((a, b) => b.score - a.score).slice(0, 10)
	localStorage.setItem('leaderboard', JSON.stringify(list))
	dispatch({ type: ACTIONS.SET_LEADERBOARD, list })
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

const INITIAL_STATE = list

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTIONS.SET_LEADERBOARD:
			return action.list
		default:
			return state
	}
}

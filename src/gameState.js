import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as credits } from './credits'
import { reducer as towers } from './towers'
import { reducer as waves } from './waves'
import { reducer as controls } from './controls'
import { reducer as stats } from './stats'
import { reducer as leaderboard } from './leaderboard'

const INITIAL_PRODUCTS = {
	COMMUNITY: 0,
	PUBLISHER: 0,
	ANALYTICS: 0,
	INFLUENCERS: 0,
	AUDIENCES: 0,
}

const products = (state = INITIAL_PRODUCTS, action) => {
	switch (action.type) {
		case 'BUY_PRODUCT':
			return {
				...state,
				[action.payload]: state[action.payload] + 1,
			}
		default:
			return state
	}
}

let store = null

export const getStore = () => {
	if (!store) {
		store = createStore(
			combineReducers({ credits, products, towers, waves, controls, stats, leaderboard }),
			applyMiddleware(thunk)
		)
	}
	return store
}

export const getNewStore = () => {
	store = null
	return getStore()
}

window.getStore = getStore

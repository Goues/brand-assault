import { toFixedRound } from './utils'

export const GAME_WIDTH = 660
export const GAME_HEIGHT = 660
export const TILES_X = 11
export const TILES_Y = 11
export const TILE_WIDTH = GAME_WIDTH / TILES_X
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y

export const PRODUCTS = {
	COMMUNITY: {
		NAME: 'Community',
		DESCRIPTION: 'Gain 0.1 SC per second. Increases maximum number of agents.',
		COST: 2,
		INCOME: 0.1,
		RATE: 1000, // every second
		MULTIPLIER: 1.1,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.COMMUNITY.INCOME * level, 1)
		},
	},
	PUBLISHER: {
		NAME: 'Publisher',
		DESCRIPTION: 'Positive comments gain 0.5 % more HP',
		COST: 10,
		BONUS: 0.005,
		MULTIPLIER: 1.2,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.PUBLISHER.BONUS * level * 100, 1)
		},
	},
	INFLUENCERS: {
		NAME: 'Influencers',
		DESCRIPTION: 'Gain 50 SC per minute',
		COST: 50,
		INCOME: 25,
		RATE: 60000, // every minute
		MULTIPLIER: 1.1,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.INFLUENCERS.INCOME * level, 1)
		},
	},
	AUDIENCES: {
		NAME: 'Audiences',
		DESCRIPTION: 'Gain 1 % chance to convert negative comments to neutral at the start of the wave',
		COST: 50,
		BONUS: 0.01,
		MULTIPLIER: 1.3,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.AUDIENCES.BONUS * level * 100, 1)
		},
	},
	ANALYTICS: {
		NAME: 'Analytics',
		DESCRIPTION: 'Boosts your damage to comments',
		COST: 100,
		BONUS: 1.2,
		MULTIPLIER: 1.2,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.ANALYTICS.BONUS ** level, 2)
		},
	},
}

export const PRODUCTS_GET_COST = (product, level) => {
	const { COST, MULTIPLIER } = PRODUCTS[product]
	return COST * MULTIPLIER ** (level - 1)
}

export const COMMENTS = {
	NEGATIVE: {
		INITIAL: 8,
		MULTIPLIER: 1.1,
	},
	NEUTRAL: {
		INITIAL: 2,
		MULTIPLIER: 1.1,
	},
	POSITIVE: {
		INITIAL: 0.9,
		MULTIPLIER: 1.1,
	},
}

export const HIT_POINTS = {
	COMMENT: {
		INITIAL: 10,
		MULTIPLIER: 1.25,
	},
	HATER: {
		INITIAL: 50,
		MULTIPLIER: 5,
	},
	BOSS: {
		INITIAL: 200,
		MULTIPLIER: 5,
	},
}

export const GET_COMMENTS_FOR_WAVE = (wave) => ({
	NEGATIVE: Math.floor(COMMENTS.NEGATIVE.INITIAL * COMMENTS.NEGATIVE.MULTIPLIER ** (wave - 1)),
	NEUTRAL: Math.floor(COMMENTS.NEUTRAL.INITIAL * COMMENTS.NEUTRAL.MULTIPLIER ** (wave - 1)),
	POSITIVE: Math.floor(COMMENTS.POSITIVE.INITIAL * COMMENTS.POSITIVE.MULTIPLIER ** (wave - 1)),
})

export const GET_COMMENTS_HP_FOR_WAVE = (wave, publisher) => ({
	comment: Math.floor(HIT_POINTS.COMMENT.INITIAL * HIT_POINTS.COMMENT.MULTIPLIER ** (wave - 1)),
	positive: Math.floor(
		HIT_POINTS.COMMENT.INITIAL *
			HIT_POINTS.COMMENT.MULTIPLIER ** (wave - 1) *
			(1 + PRODUCTS.PUBLISHER.BONUS * publisher)
	),
	hater: Math.floor(HIT_POINTS.HATER.INITIAL * HIT_POINTS.HATER.MULTIPLIER ** ((wave - 5) / 10)),
	influencer: Math.floor(
		HIT_POINTS.BOSS.INITIAL * HIT_POINTS.BOSS.MULTIPLIER ** ((wave - 10) / 10)
	),
})

export const IS_BOSS = (wave) => wave % 10 === 0

export const BASE_DAMAGE = 1

export const GET_DAMAGE = (baseDamage, analytics) => {
	return baseDamage * PRODUCTS.ANALYTICS.BONUS ** analytics
}

export const GET_AUDIENCES_CHANCE = (audiences) => {
	return Math.random() < PRODUCTS.AUDIENCES.BONUS * audiences
}

export const BASE_TOWER = {
	RANGE: 2,
	FIRING_SPEED: 1000,
	DAMAGE: 1,
}

export const TOWER_TYPES = {
	DEFAULT: 'DEFAULT',
	QUICK_TO_BAN_AGENT: 'QUICK_TO_BAN_AGENT',
	PURGER: 'PURGER',
	OPTIMIST: 'OPTIMIST',
	POWER_USER: 'POWER_USER',
	BUSY_BEE: 'BUSY_BEE',
}

export const TOWERS = {
	DEFAULT: {
		damage: {
			negative: BASE_TOWER.DAMAGE,
			neutral: BASE_TOWER.DAMAGE,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		firingSpeed: BASE_TOWER.FIRING_SPEED,
		cost: 0,
	},
	QUICK_TO_BAN_AGENT: {
		damage: {
			negative: BASE_TOWER.DAMAGE,
			positive: BASE_TOWER.DAMAGE,
			neutral: BASE_TOWER.DAMAGE,
			hater: BASE_TOWER.DAMAGE,
			infuencer: BASE_TOWER.DAMAGE,
		},
		chance: {
			positive: 0.3,
		},
		firingSpeed: BASE_TOWER.FIRING_SPEED,
		cost: 20,
	},
	PURGER: {
		damage: {
			negative: BASE_TOWER.DAMAGE * 2,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		firingSpeed: BASE_TOWER.FIRING_SPEED,
		cost: 30,
	},
	OPTIMIST: {
		damage: {
			negative: BASE_TOWER.DAMAGE,
			neutral: BASE_TOWER.DAMAGE,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		slow: {
			negative: 0.5,
		},
		firingSpeed: BASE_TOWER.FIRING_SPEED,
		cost: 20,
	},
	POWER_USER: {
		damage: {
			negative: BASE_TOWER.DAMAGE,
			neutral: BASE_TOWER.DAMAGE,
			positive: BASE_TOWER.DAMAGE,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		firingSpeed: BASE_TOWER.FIRING_SPEED * 1.5,
		cost: 50,
		burstArea: TILE_WIDTH / 2,
		burstDamage: BASE_TOWER.DAMAGE,
	},
	BUSY_BEE: {
		damage: {
			negative: BASE_TOWER.DAMAGE,
			neutral: BASE_TOWER.DAMAGE,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		cost: 30,
		firingSpeed: BASE_TOWER.FIRING_SPEED / 2,
	},
}

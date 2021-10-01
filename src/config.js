import { toFixedRound } from './utils'
import SocialCredit from './IdleApp/Icons/SocialCredit'

export const GAME_WIDTH = 660
export const GAME_HEIGHT = 600
export const TILES_X = 11
export const TILES_Y = 10
export const TILE_WIDTH = GAME_WIDTH / TILES_X
export const TILE_HEIGHT = GAME_HEIGHT / TILES_Y
export const WAVE_TIMER_MS = 60000
// scoring
export const WAVE_POINTS_EXPONENT = 100
export const POINTS_FOR_KILLED_COMMENT = 1
export const POINTS_FOR_KILLED_HATER = 10
export const POINTS_FOR_KILLED_BOSS = 25

export const PRODUCTS = {
	COMMUNITY: {
		NAME: 'Community',
		DESCRIPTION: (
			<>
				Gain 0.1 <SocialCredit width='10' /> per second. Increases maximum number of agents.
			</>
		),
		COST: 2,
		INCOME: 0.1,
		RATE: 1000, // every second
		MULTIPLIER: 1.1,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.COMMUNITY.INCOME * level, 1)
		},
		KEYCODE: 'c',
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
		KEYCODE: 'x',
	},
	INFLUENCERS: {
		NAME: 'Influencers',
		DESCRIPTION: (
			<>
				Gain 10 <SocialCredit width='10' /> per minute
			</>
		),
		COST: 50,
		INCOME: 10,
		RATE: 60000, // every minute
		MULTIPLIER: 1.1,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.INFLUENCERS.INCOME * level, 1)
		},
		KEYCODE: 'v',
	},
	AUDIENCES: {
		NAME: 'Audiences',
		DESCRIPTION: 'Gain 1 % chance to convert negative comments to neutral at the start of the wave',
		COST: 50,
		MAX_LEVEL: 100,
		BONUS: 0.01,
		MULTIPLIER: 1.3,
		GET_BONUS: (level) => {
			if (level > PRODUCTS.AUDIENCES.MAX_LEVEL) level = PRODUCTS.AUDIENCES.MAX_LEVEL
			return toFixedRound(PRODUCTS.AUDIENCES.BONUS * level * 100, 1)
		},
		KEYCODE: 'd',
	},
	ANALYTICS: {
		NAME: 'Analytics',
		DESCRIPTION: 'Boosts your damage to comments',
		COST: 100,
		BONUS: 1.1,
		MULTIPLIER: 1.2,
		GET_BONUS: (level) => {
			return toFixedRound(PRODUCTS.ANALYTICS.BONUS ** level, 2)
		},
		KEYCODE: 'f',
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
	MAX_RANGE: 3,
	FIRING_SPEED: 1000,
	MIN_FIRING_SPEED: 500,
	DAMAGE: 1,
	RANGE_MULTIPLIER: (level) =>
		BASE_TOWER.MAX_RANGE - (BASE_TOWER.MAX_RANGE - BASE_TOWER.RANGE) / level,
	FIRING_SPEED_MULTIPLIER: (level) =>
		BASE_TOWER.MIN_FIRING_SPEED + (BASE_TOWER.FIRING_SPEED - BASE_TOWER.MIN_FIRING_SPEED) / level,
	DAMAGE_MULTIPLIER: (level) => BASE_TOWER.DAMAGE * level,
	TOKENS: 1,
	GET_TOKENS: (level) => BASE_TOWER.TOKENS * 2 ** (level - 1),
	CREDITS: 10,
	GET_CREDITS: (level) => BASE_TOWER.CREDITS * 2 ** (level - 1),
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
		firingSpeed: 1,
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
		firingSpeed: 1,
		cost: 20,
	},
	PURGER: {
		damage: {
			negative: BASE_TOWER.DAMAGE * 2,
			hater: BASE_TOWER.DAMAGE,
			influencer: BASE_TOWER.DAMAGE,
		},
		firingSpeed: 1,
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
		firingSpeed: 1,
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
		firingSpeed: 1.5,
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
		firingSpeed: 1 / 2,
	},
}

export const SOUNDS = {
	BACKGROUND_MUSIC: 'background_musc',
	DAMAGE: 'damage',
	COINS: 'coins',
	LASER: 'laser',
	GAMEOVER: 'gameover',
}

export const KEYCODE_BINDINGS = {
	PAUSE: 80, // p
	SOCIAL_CREDITS: 83, // s
	COMMUNITY: 67, // c
	PUBLISHER: 88, // x
	INFLUENCERS: 86, // v
	AUDIENCES: 68, // d
	ANALYTICS: 70, // f
}

export const PRODUCTS = {
  COMMUNITY: {
    NAME: 'Community',
    DESCRIPTION: 'Gain 0.1 SC per second',
    COST: 2,
    INCOME: 0.1,
    RATE: 1000, // every second
    MULTIPLIER: 1.1,
    NEXT_BONUS: (level) => {
      return (PRODUCTS.COMMUNITY.INCOME * PRODUCTS.COMMUNITY.MULTIPLIER ** (level + 1)).toFixed(3)
    },
    CURRENT_BONUS: (level) => {
      return (PRODUCTS.COMMUNITY.INCOME * PRODUCTS.COMMUNITY.MULTIPLIER ** level).toFixed(3)
    },
    NEXT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.COMMUNITY.NEXT_BONUS(level)} SC per second`
    },
    CURRENT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.COMMUNITY.CURRENT_BONUS(level)} SC per second`
    },
  },
  PUBLISHER: {
    NAME: 'Publisher',
    DESCRIPTION: 'Positive comments gain 0.5 % more HP',
    COST: 10,
    BONUS: 0.005,
    MULTIPLIER: 1.2,
    NEXT_BONUS: (level) => {
      return (PRODUCTS.PUBLISHER.BONUS * PRODUCTS.PUBLISHER.MULTIPLIER ** (level + 1)).toFixed(3)
    },
    CURRENT_BONUS: (level) => {
      return (PRODUCTS.PUBLISHER.BONUS * PRODUCTS.PUBLISHER.MULTIPLIER ** level).toFixed(3)
    },
    NEXT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.PUBLISHER.NEXT_BONUS(level)} % HP`
    },
    CURRENT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.PUBLISHER.CURRENT_BONUS(level)} % HP`
    },
  },
  INFLUENCERS: {
    NAME: 'Influencers',
    DESCRIPTION: 'Gain 50 SC per minute',
    COST: 50,
    INCOME: 25,
    RATE: 60000, // every minute
    MULTIPLIER: 1.1,
    NEXT_BONUS: (level) => {
      return (PRODUCTS.INFLUENCERS.INCOME * PRODUCTS.INFLUENCERS.MULTIPLIER ** (level + 1)).toFixed(
        3
      )
    },
    CURRENT_BONUS: (level) => {
      return (PRODUCTS.INFLUENCERS.INCOME * PRODUCTS.INFLUENCERS.MULTIPLIER ** level).toFixed(3)
    },
    NEXT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.INFLUENCERS.NEXT_BONUS(level)} SC per minute`
    },
    CURRENT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.INFLUENCERS.CURRENT_BONUS(level)} SC per minute`
    },
  },
  AUDIENCES: {
    NAME: 'Audiences',
    DESCRIPTION: 'Gain 1 % chance to convert negative comments to neutral at the start of the wave',
    COST: 50,
    BONUS: 0.01,
    MULTIPLIER: 1.3,
    NEXT_BONUS: (level) => {
      return (PRODUCTS.AUDIENCES.BONUS * PRODUCTS.AUDIENCES.MULTIPLIER ** (level + 1)).toFixed(3)
    },
    CURRENT_BONUS: (level) => {
      return (PRODUCTS.AUDIENCES.BONUS * PRODUCTS.AUDIENCES.MULTIPLIER ** level).toFixed(3)
    },
    NEXT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.AUDIENCES.NEXT_BONUS(level)} % Chance`
    },
    CURRENT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.AUDIENCES.CURRENT_BONUS(level)} % Chance`
    },
  },
  ANALYTICS: {
    NAME: 'Analytics',
    DESCRIPTION: 'Boosts your damage to comments',
    COST: 100,
    BONUS: 0.5,
    MULTIPLIER: 1.2,
    NEXT_BONUS: (level) => {
      return (PRODUCTS.ANALYTICS.BONUS * PRODUCTS.ANALYTICS.MULTIPLIER ** (level + 1)).toFixed(3)
    },
    CURRENT_BONUS: (level) => {
      return (PRODUCTS.ANALYTICS.BONUS * PRODUCTS.ANALYTICS.MULTIPLIER ** level).toFixed(3)
    },
    NEXT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.ANALYTICS.NEXT_BONUS(level)} DMG`
    },
    CURRENT_BONUS_DESCRIPTION: (level) => {
      return `+${PRODUCTS.ANALYTICS.CURRENT_BONUS(level)} DMG`
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
    MULTIPLIER: 1.05,
  },
  NEUTRAL: {
    INITIAL: 2,
    MULTIPLIER: 1.05,
  },
  POSITIVE: {
    INITIAL: 0.9,
    MULTIPLIER: 1.05,
  },
}

export const HIT_POINTS = {
  COMMENT: {
    INITIAL: 10,
    MULTIPLIER: 1.2,
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
  hater: Math.floor(HIT_POINTS.HATER.INITIAL * HIT_POINTS.HATER.MULTIPLIER ** ((wave - 5) / 5)),
  influencer: Math.floor(
    HIT_POINTS.BOSS.INITIAL * HIT_POINTS.BOSS.MULTIPLIER ** ((wave - 10) / 10)
  ),
})

export const IS_BOSS = (wave) => wave % 10 === 0

export const BASE_DAMAGE = 1

export const GET_DAMAGE = (baseDamage, analytics) => {
  return baseDamage * PRODUCTS.ANALYTICS.MULTIPLIER ** analytics
}

export const GET_AUDIENCES_CHANCE = (audiences) => {
  return Math.random() < PRODUCTS.AUDIENCES.BONUS * audiences
}

export const PRODUCTS = {
  COMMUNITY: {
    COST: 2,
    INCOME: 0.1,
    RATE: 1, // every second
    MULTIPLIER: 1.1,
  },
  PUBLISHER: {
    COST: 10,
    BONUS: 0.5,
    MULTIPLIER: 1.2,
  },
  INFLUENCERS: {
    COST: 50,
    INCOME: 25,
    RATE: 60, // every minute
    MULTIPLIER: 1.1,
  },
  AUDIENCES: {
    COST: 50,
    BONUS: 2,
    MULTIPLIER: 1.3,
  },
  ANALYTICS: {
    COST: 100,
    BONUS: 0.5,
    MULTIPLIER: 1.2,
  }
}

export const PRODUCTS_GET_COST = (product, level) => {
  const {COST, MULTIPLIER} = PRODUCTS[product]
  return COST * (level) ** MULTIPLIER
}

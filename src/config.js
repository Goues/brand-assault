export const PRODUCTS = {
  COMMUNITY: {
    NAME: "Community",
    COST: 2,
    INCOME: 0.1,
    RATE: 1000, // every second
    MULTIPLIER: 1.1
  },
  PUBLISHER: {
    NAME: "Publisher",
    COST: 10,
    BONUS: 0.5,
    MULTIPLIER: 1.2
  },
  INFLUENCERS: {
    NAME: "Influencers",
    COST: 50,
    INCOME: 25,
    RATE: 60000, // every minute
    MULTIPLIER: 1.1
  },
  AUDIENCES: {
    NAME: "Audiences",
    COST: 50,
    BONUS: 2,
    MULTIPLIER: 1.3
  },
  ANALYTICS: {
    NAME: "Analytics",
    COST: 100,
    BONUS: 0.5,
    MULTIPLIER: 1.2
  }
};

export const PRODUCTS_GET_COST = (product, level) => {
  const { COST, MULTIPLIER } = PRODUCTS[product];
  return COST * MULTIPLIER ** (level - 1);
};

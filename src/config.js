export const PRODUCTS = {
  COMMUNITY: {
    COST: 2n,
    INCOME: 1n / 10n,
    MULTIPLIER: 11n / 10n,
  }
}

export const PRODUCTS_GET_COST = (product, level) => {
  const {COST, MULTIPLIER} = PRODUCTS[product]
  return COST * (level) ** MULTIPLIER
}

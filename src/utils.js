export const toFixedRound = (number, decimals) =>
  number.toFixed(decimals).replace(/\.0+$/, "");

export function getDistanceSquare({ x, y }) {
  return x * x + y * y;
}

export function getDistanceFromCenters(a, b) {
  return {
    x: Math.abs(a.x - b.x),
    y: Math.abs(a.y - b.y)
  };
}

export function getDistance(a, b) {
  return getDistanceFromCenters(a.center, b.center);
}

export function isWithinRange(a, b, range) {
  const distance = getDistance(a, b);
  return distance.x * distance.x + distance.y * distance.y <= range * range;
}

export const toFixedRound = (number, decimals) =>
  number.toFixed(decimals).replace(/.?0+$/, "");

export function getCenter({ x, y, width, height }) {
  return { x: x + width / 2, y: y + height / 2 };
}

export function getDistanceLength({ x, y }) {
  return Math.sqrt(x * x + y * y);
}

export function getDistanceFromCenters(a, b) {
  return {
    x: Math.abs(a.x - b.x),
    y: Math.abs(a.y - b.y)
  };
}

export function getDistance(a, b) {
  a = getCenter(a);
  b = getCenter(b);
  return getDistanceFromCenters(a, b);
}

export function isWithinRange(a, b) {
  const distance = getDistance(a, b);
  return distance.x * distance.x + distance.y * distance.y <= a.range * a.range;
}

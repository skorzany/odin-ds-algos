// helper functions
function numberToCoords(n) {
  if (!Number.isInteger(n)) throw new Error('Invalid input.');
  return [Math.floor(n / 8), n % 8];
}

function coordsToNumber(coords) {
  if (
    !Array.isArray(coords) ||
    !Number.isInteger(coords[0]) ||
    !Number.isInteger(coords[1])
  )
    throw new Error('Invalid input.');
  return coords[0] * 8 + coords[1];
}

function inRange(x, min, max) {
  if ([typeof x, typeof min, typeof max].some((type) => type !== 'number'))
    throw new Error('Invalid input.');
  return min < x && x < max;
}

export { numberToCoords, coordsToNumber, inRange };

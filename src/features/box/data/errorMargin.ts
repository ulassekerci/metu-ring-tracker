export const getErrorMargin = (maxDistance?: number) => {
  if (!maxDistance || isNaN(maxDistance)) return 'Bilinmiyor'
  else return maxDistance.toFixed(0) + 'm'
}

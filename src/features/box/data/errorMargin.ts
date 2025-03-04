export const getErrorMargin = (maxDistance?: number) => {
  if (!maxDistance || isNaN(maxDistance)) return 'Çok Yüksek'
  else return maxDistance > 1500 ? 'Yüksek' : 'Düşük'
}

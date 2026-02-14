export const medianUpper = (sorted: number[]) => {
  const n = sorted.length
  if (n === 0) return undefined

  return sorted[Math.floor(n / 2)]
}

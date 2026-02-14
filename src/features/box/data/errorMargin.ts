export const getErrorMargin = (distances: number[]) => {
  if (!distances.length) return 'Hesaplanamadı'
  const distancesWithoutOutliers = filterOutliers(distances)
  const largest = Math.max(...distancesWithoutOutliers)
  const smallest = Math.min(...distancesWithoutOutliers)
  const difference = largest - smallest

  if (difference > 1000) return 'Yüksek'
  if (difference > 500) return 'Orta'
  return 'Düşük'
}

const filterOutliers = (numbers: number[]) => {
  if (numbers.length < 4) return numbers

  let values, q1, q3, iqr, maxValue, minValue

  values = numbers.slice().sort((a, b) => a - b) //copy array fast and sort

  if ((values.length / 4) % 1 === 0) {
    //find quartiles
    q1 = (1 / 2) * (values[values.length / 4] + values[values.length / 4 + 1])
    q3 = (1 / 2) * (values[values.length * (3 / 4)] + values[values.length * (3 / 4) + 1])
  } else {
    q1 = values[Math.floor(values.length / 4 + 1)]
    q3 = values[Math.ceil(values.length * (3 / 4) + 1)]
  }

  iqr = q3 - q1
  maxValue = q3 + iqr * 1.5
  minValue = q1 - iqr * 1.5

  return values.filter((x) => x >= minValue && x <= maxValue)
}

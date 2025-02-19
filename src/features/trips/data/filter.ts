import { DateTime } from 'luxon'
import { TripData } from './get'

export const filterSuspicious = (trip: TripData) => {
  const tripDate = DateTime.fromJSDate(new Date(trip.points[0].timestamp))
  const reversePoints = trip.points.slice().reverse()
  const ringColor = reversePoints[0].color.toUpperCase()

  // if live, return false
  const isLive = tripDate.diffNow('minutes').minutes > -3
  if (isLive) return false

  // if starts as red
  if (ringColor === '#FF0000') return true

  // if yellow with unexpected duration or address
  if (ringColor === '#FFFF57') {
    if (trip.duration < 1800 || trip.duration > 4000) return true
    if (!reversePoints[0].address.includes('A2') && !reversePoints[0].address.includes('Garaj')) return true
    if (
      !trip.points[0].address.includes('A2') &&
      !trip.points[0].address.includes('Garaj') &&
      !trip.points[0].address.includes('BOTE-MYO')
    )
      return true
  }

  // if brown with unexpected duration or address
  if (ringColor === '#A64D00') {
    if (trip.duration < 600 || trip.duration > 1400) return true
    if (!reversePoints[0].address.includes('A1')) return true
    if (!trip.points[0].address.includes('A1')) return true
  }

  // if purple with unexpected duration or address
  if (ringColor === '#9600CD') {
    if (trip.duration < 900 || trip.duration > 2400) return true
    if (!reversePoints[0].address.includes('A1')) return true
    if (!trip.points[0].address.includes('A1')) return true
  }

  // if gray with unexpected duration or address
  if (ringColor === '#737373') {
    if (trip.duration < 1800 || trip.duration > 4000) return true
    if (!reversePoints[0].address.includes('A2')) return true
    if (!trip.points[0].address.includes('A2')) return true
  }

  // if blue with unexpected duration or address
  if (ringColor === '#0000FF') {
    if (trip.duration < 1000 || trip.duration > 2400) return true
    if (!reversePoints[0].address.includes('Dogu yurtlar')) return true
    if (!trip.points[0].address.includes('Dogu yurtlar')) return true
  }

  return false
}

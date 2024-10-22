import { Hono } from 'hono'
import { RingLog } from './interfaces'
import { DateTime } from 'luxon'
import sql from './db'

const app = new Hono()

app.get('/', async (c) => {
  const ringData = (await sql`SELECT * FROM ring_history ORDER BY timestamp DESC`) as RingLog[]
  const ringTripIDs = [...new Set(ringData.map((log) => log.trip_id))]

  const ringTrips = ringTripIDs.map((tripID) => {
    const tripLogs = ringData.filter((log) => log.trip_id === tripID)
    const tripStart = DateTime.fromJSDate(new Date(tripLogs[0].timestamp))
    const tripEnd = DateTime.fromJSDate(new Date(tripLogs[tripLogs.length - 1].timestamp))
    const tripDuration = tripEnd.diff(tripStart, 'seconds').seconds
    const ringTime = findClosestStartTime(tripStart)
    return {
      tripID,
      departure: ringTime.toFormat('HH:mm'),
      duration: tripDuration,
      points: tripLogs.map((log) => ({
        timestamp: log.timestamp,
        address: log.address,
        color: log.color,
        state: log.state,
      })),
    }
  })

  return c.json(ringTrips)
})

const findClosestStartTime = (tripTime: DateTime) => {
  const closest20thMinute = Math.round(tripTime.minute / 20) * 20
  const isWeekendOrNight = tripTime.hour > 17 || tripTime.isWeekend
  return tripTime.set({
    minute: isWeekendOrNight ? 30 : closest20thMinute,
    second: 0,
  })
}

export default app

import { Hono } from 'hono'
import { RingLog } from './interfaces'
import { DateTime } from 'luxon'
import sql from './db'

const app = new Hono()

app.get('/', async (c) => {
  const ringData = (await sql`SELECT * FROM ring_history`) as RingLog[]
  const ringTripIDs = [...new Set(ringData.map((log) => log.trip_id))]

  const ringTrips = ringTripIDs.map((tripID) => {
    const tripLogs = ringData.filter((log) => log.trip_id === tripID)
    const tripStart = DateTime.fromJSDate(new Date(tripLogs[0].timestamp))
    const ringTime = findClosestStartTime(tripStart)
    return {
      tripID,
      startTimestamp: tripLogs[0].timestamp,
      ringTime: ringTime.toFormat('HH:mm'),
    }
  })

  return c.json(ringTrips)
})

const findClosestStartTime = (tripTime: DateTime) => {
  const roundedMinutes = Math.round(tripTime.minute / 20) * 20
  return tripTime.set({
    minute: tripTime.isWeekend ? 30 : roundedMinutes,
    second: 0,
  })
}

export default app

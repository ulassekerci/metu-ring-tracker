import axios from 'axios'
import { RingData, VehicleTrip } from './interfaces'
import sql from './db'
import { nanoid } from 'nanoid'
import { DateTime } from 'luxon'
import { checkMovement } from './helpers'

export const lastCrawl = {
  data: null as RingData[] | null,
  vehicles: [] as VehicleTrip[],
  timestamp: null as DateTime | null,
}

export const crawl = async () => {
  const ringReq = await axios.get('https://ring.metu.edu.tr/ring.json')
  const ringData = ringReq.data as RingData[] | string
  lastCrawl.timestamp = DateTime.now().setZone('Europe/Istanbul')

  // If there is no data, return
  if (typeof ringData === 'string') {
    lastCrawl.data = null
    lastCrawl.vehicles = []
    return
  }

  // If there is no movement, return
  if (!checkMovement(ringData)) return

  // Update lastCrawl
  lastCrawl.data = ringData
  lastCrawl.vehicles.map((oldVehicle) => {
    if (ringData.find((v) => v.id === oldVehicle.plate)) return
    lastCrawl.vehicles.splice(
      lastCrawl.vehicles.findIndex((v) => v.plate === oldVehicle.plate),
      1
    )
  })

  // Record to database
  ringData.map(async (ring) => {
    const lastVehicle = lastCrawl.vehicles.find((v) => v.plate === ring.id)
    const vehicle = lastVehicle || { tripID: nanoid(), plate: ring.id }
    lastCrawl.vehicles.push(vehicle)

    const historyData = {
      trip_id: vehicle?.tripID || nanoid(),
      lat: ring.lat,
      lng: ring.lng,
      address: ring.addr,
      color: ring.clr,
      state: ring.key,
      plate: ring.id,
      timestamp: DateTime.now().setZone('Europe/Istanbul').toSQL(),
    }

    await sql`INSERT INTO ring_history ${sql(historyData)}`
  })
}

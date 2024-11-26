import { AvgPoint, fetchAverages } from '@/features/live/api'
import { getBetterColor } from '@/lib/colors'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'

export default function Home() {
  const [ringPoints, setRingPoints] = useState<AvgPoint[]>([])

  const { data } = useQuery({
    queryKey: ['liveData'],
    queryFn: () => fetchAverages(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const updatePins = () => {
    if (!data) return
    const newRingPoints: AvgPoint[] = []
    const departures = new Set(data.map((point) => point.departure))
    departures.forEach((departure) => {
      const points = data.filter((point) => point.departure === departure)
      // find closest point in time to now
      const closestPoint = points.reduce((prev, current) => {
        const prevTime = DateTime.fromISO(prev.time, { zone: 'Europe/Istanbul' })
        const currentTime = DateTime.fromISO(current.time, { zone: 'Europe/Istanbul' })
        const prevDiff = Math.abs(prevTime.diffNow('seconds').seconds)
        const currentDiff = Math.abs(currentTime.diffNow('seconds').seconds)
        return prevDiff < currentDiff ? prev : current
      })
      newRingPoints.push(closestPoint)
    })
    setRingPoints(newRingPoints)
  }

  useEffect(() => {
    updatePins()
    const updateInterval = setInterval(updatePins, 1000)
    return () => clearInterval(updateInterval)
  }, [data])

  return (
    <>
      <Map
        initialViewState={{
          longitude: 32.778,
          latitude: 39.89,
          zoom: 13.09,
        }}
        style={{ height: '100vh' }}
        mapStyle='/mapstyle.json'
        attributionControl={false}
      >
        {ringPoints.map((point) => (
          <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
            {/* <img width={24} height={24} src='./favicon.ico' /> */}
            <GhostIcon color={point.color} />
          </Marker>
        ))}
      </Map>
    </>
  )
}

const GhostIcon = ({ color }: { color: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path
        fill={getBetterColor(color)}
        d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8'
      ></path>
      <path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M9 10h.01M15 10h.01'></path>
    </svg>
  )
}

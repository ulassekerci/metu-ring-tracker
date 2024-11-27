import { AvgPoint, fetchAverages, fetchLive, LivePoint } from '@/features/live/api'
import { getBetterColor } from '@/lib/colors'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'

export default function Home() {
  const [ghostPoints, setGhostPoints] = useState<AvgPoint[]>([])
  const [livePoints, setLivePoints] = useState<LivePoint[]>([])

  const { data: avgData } = useQuery({
    queryKey: ['avgdata'],
    queryFn: () => fetchAverages(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const { data: liveData } = useQuery({
    queryKey: ['livedata'],
    queryFn: () => fetchLive(),
    refetchInterval: 1000,
  })

  const updateBuses = () => {
    if (!liveData?.data) return
    const newLivePoints = liveData.data
    setLivePoints(newLivePoints)
  }

  const updateGhosts = () => {
    if (!avgData) return
    const newGhostPoints: AvgPoint[] = []
    const departures = new Set(avgData.map((point) => point.departure))
    departures.forEach((departure) => {
      const points = avgData.filter((point) => point.departure === departure)
      // find closest point in time to now
      const closestPoint = points.reduce((prev, current) => {
        const prevTime = DateTime.fromISO(prev.time, { zone: 'Europe/Istanbul' })
        const currentTime = DateTime.fromISO(current.time, { zone: 'Europe/Istanbul' })
        const prevDiff = Math.abs(prevTime.diffNow('seconds').seconds)
        const currentDiff = Math.abs(currentTime.diffNow('seconds').seconds)
        return prevDiff < currentDiff ? prev : current
      })
      newGhostPoints.push(closestPoint)
    })
    setGhostPoints(newGhostPoints)
  }

  useEffect(() => {
    updateBuses()
  }, [liveData?.timestamp])

  useEffect(() => {
    updateGhosts()
    const updateInterval = setInterval(updateGhosts, 1000)
    return () => clearInterval(updateInterval)
  }, [avgData])

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
        {ghostPoints.map((point) => (
          <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
            <GhostIcon color={point.color} />
          </Marker>
        ))}
        {livePoints.map((point) => (
          <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
            <img width={24} height={24} src='./favicon.ico' />
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
        stroke='#ffffff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1'
        d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8'
      ></path>
      <path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 10h.01M15 10h.01'></path>
    </svg>
  )
}

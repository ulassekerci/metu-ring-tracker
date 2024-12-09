import { Ghost } from '@/features/pins/components/Ghost'
import { BusPin } from '@/features/pins/components/Pin'
import { AvgPoint, getGhostLocations, useAverageData } from '@/features/pins/data/average'
import { LivePoint, useLiveData } from '@/features/pins/data/live'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'

export default function Home() {
  const [ghostPoints, setGhostPoints] = useState<AvgPoint[]>([])
  const [livePoints, setLivePoints] = useState<LivePoint[]>([])

  const { data: avgData } = useAverageData()
  const { data: liveData } = useLiveData()

  const updateBuses = () => {
    if (!liveData?.data) return
    setLivePoints(liveData.data)
  }

  const updateGhosts = () => {
    if (!avgData) return
    const newGhostPoints = getGhostLocations(avgData)
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
            <Ghost color={point.color} />
          </Marker>
        ))}
        {livePoints.map((point) => (
          <BusPin key={point.id} point={point} />
        ))}
      </Map>
      <div className='absolute right-2 bottom-2 px-1 text-xs bg-white bg-opacity-50 rounded-full'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

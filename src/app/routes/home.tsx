import { InfoBox } from '@/features/box/components/InfoBox'
import { BusPin, GhostPin, OtherGhostPin } from '@/features/pins/components/Pin'
import { useAverageData, useOtherGhosts } from '@/features/pins/data/average'
import { useLiveData } from '@/features/pins/data/live'
import Map from 'react-map-gl/maplibre'

export default function Home() {
  const { data: ghostData } = useAverageData()
  const { data: liveData } = useLiveData()
  const { data: otherGhosts } = useOtherGhosts()

  return (
    <>
      <Map
        initialViewState={{
          longitude: 32.778,
          latitude: 39.8915,
          zoom: 13.09,
        }}
        style={{ height: '100vh' }}
        mapStyle='/mapstyle.json'
        attributionControl={false}
        minZoom={13}
        maxBounds={[
          [32.686, 39.856],
          [32.873, 39.936],
        ]}
      >
        {ghostData?.map((point) => (
          <GhostPin key={point.id} point={point} />
        ))}
        {liveData?.data?.map((point) => (
          <BusPin key={point.id} point={point} />
        ))}
        {otherGhosts?.map((point) => (
          <OtherGhostPin key={point.id} point={point} />
        ))}
      </Map>
      <InfoBox />

      <div className='absolute right-2 bottom-2 px-2 text-xs bg-white bg-opacity-50 rounded-full'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

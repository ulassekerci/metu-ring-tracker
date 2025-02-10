import { InfoBox } from '@/features/box/components/InfoBox'
import { useInfoBoxStore } from '@/features/box/store'
import { BusPin, GhostPin, OtherGhostPin } from '@/features/pins/components/Pin'
import { useGhostData } from '@/features/pins/data/ghosts'
import { useLiveData } from '@/features/pins/data/live'
import Map from 'react-map-gl/maplibre'

export default function Home() {
  const { data: ghostData } = useGhostData()
  const { data: liveData } = useLiveData()
  const { selected, ghostData: selectedGhost } = useInfoBoxStore()

  return (
    <>
      <Map
        initialViewState={{
          longitude: 32.778,
          latitude: 39.8915,
          zoom: 13.09,
        }}
        style={{ height: '100dvh' }}
        mapStyle='/mapstyle.json'
        attributionControl={false}
        minZoom={13}
        maxBounds={[
          [32.686, 39.856],
          [32.873, 39.936],
        ]}
      >
        {ghostData?.map((trip) => (
          <GhostPin key={trip.middlePoint.id} point={trip.middlePoint} />
        ))}
        {liveData?.data?.map((point) => (
          <BusPin key={point.id} point={point} />
        ))}
        {selected === 'ghost' &&
          ghostData
            ?.find((data) => data.departure === selectedGhost?.departure)
            ?.trips.map((point) => <OtherGhostPin key={point.id} point={point} />)}
      </Map>
      <InfoBox />

      <div className='absolute right-0 bottom-2 px-2 text-[9px] opacity-75 md:text-xs'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

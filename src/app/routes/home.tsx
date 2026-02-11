import { InfoBox } from '@/features/box/components/InfoBox'
import { HelpDrawer } from '@/features/help/components/helpDrawer'
import { HelpIcon } from '@/features/help/components/helpIcon'
import { BusPin } from '@/features/pins/components/Pin'
import { useLiveData } from '@/features/pins/data/live'
import Map from 'react-map-gl/maplibre'

export default function Home() {
  const { data: liveData } = useLiveData()

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
        {liveData?.map((trip) => (
          <BusPin key={trip.vehicle.plate} point={trip.closestPointToNow} />
        ))}
      </Map>

      <InfoBox />
      <HelpIcon />
      <HelpDrawer />

      <div className='absolute right-0 bottom-2 px-2 text-[9px] opacity-75 md:text-xs'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

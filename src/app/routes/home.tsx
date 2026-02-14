import { InfoBox } from '@/features/box/components/InfoBox'
import { useInfoBoxStore } from '@/features/box/store'
import { HelpDrawer } from '@/features/help/components/helpDrawer'
import { HelpIcon } from '@/features/help/components/helpIcon'
import { BusPin, GhostPin, OtherGhostsPin } from '@/features/pins/components/Pin'
import { useGhostData } from '@/features/pins/data/ghosts'
import { useLiveData } from '@/features/pins/data/live'
import Map from 'react-map-gl/maplibre'

export default function Home() {
  const { data: liveData } = useLiveData()
  const { data: ghostData } = useGhostData()
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
        {liveData?.map((trip) => (
          <BusPin key={trip.vehicle.plate} point={trip.closestPointToNow} />
        ))}
        {ghostData?.map((departure) => (
          <GhostPin key={departure.average.id} data={departure} />
        ))}
        {selected === 'ghost' &&
          ghostData
            ?.find((dep) => dep.departure.seconds === selectedGhost?.departure.seconds)
            ?.trips.map((ghostTrip) => <OtherGhostsPin key={ghostTrip.id} data={ghostTrip} />)}
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

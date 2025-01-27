import { InfoBox } from '@/features/box/components/Box'
import { BusPin, GhostPin } from '@/features/pins/components/Pin'
import { useAverageData } from '@/features/pins/data/average'
import { useLiveData } from '@/features/pins/data/live'
import { CircleHelpIcon, MenuIcon } from 'lucide-react'
import Map from 'react-map-gl/maplibre'

export default function Home() {
  const { data: ghostData } = useAverageData()
  const { data: liveData } = useLiveData()

  return (
    <>
      <div className='absolute top-0 w-full z-10 h-14 flex justify-between items-center px-4 text-primary'>
        <div className='flex items-center bg-white bg-opacity-80 rounded-full p-2 shadow-lg'>
          <MenuIcon className='w-6 h-6' />
        </div>
        <div className='flex items-center bg-white bg-opacity-80 rounded-full p-2 shadow-lg'>
          <CircleHelpIcon className='w-6 h-6' />
        </div>
      </div>
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
      </Map>
      <InfoBox />

      <div className='absolute right-2 bottom-2 px-1 text-xs bg-white bg-opacity-50 rounded-full'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

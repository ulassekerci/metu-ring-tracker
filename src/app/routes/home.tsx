import { Ghost } from '@/features/pins/components/Ghost'
import { BusPin } from '@/features/pins/components/Pin'
import { useAverageData } from '@/features/pins/data/average'
import { useLiveData } from '@/features/pins/data/live'
import { CircleHelpIcon, MenuIcon, SearchIcon } from 'lucide-react'
import Map, { Marker } from 'react-map-gl/maplibre'

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
          <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
            <Ghost color={point.color} />
          </Marker>
        ))}
        {liveData?.data?.map((point) => (
          <BusPin key={point.id} point={point} />
        ))}
      </Map>
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-96 h-28'>
        <div className='h-14 bg-primary rounded-t-xl flex justify-between items-center px-4 text-white'>
          <span className='font-medium'>Sarı-Kırmızı Ring</span>
          <span className='font-medium'>Kalkış 15.00</span>
        </div>
        <div className='h-14 bg-white rounded-b-xl flex justify-between items-center px-4 shadow-xl'>
          <span>Durak Ara</span>
          <SearchIcon className='w-6 h-6' />
        </div>
      </div>
      <div className='absolute right-2 bottom-2 px-1 text-xs bg-white bg-opacity-50 rounded-full'>
        <a href='https://www.openstreetmap.org/copyright' target='_blank'>
          © OpenStreetMap
        </a>
      </div>
    </>
  )
}

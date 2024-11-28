import { useLocalStorage } from 'usehooks-ts'
import { useTrips } from '@/features/trips/data/get'
import { useDeleteTrips } from '@/features/trips/data/delete'
import { filterSuspicious } from '@/features/trips/data/filter'
import { TripCard } from '@/features/trips/components/TripCard'

export default function Trips() {
  const [showSuspicious, setShowSuspicious] = useLocalStorage('sus', false)

  const { data: trips, isLoading: isTripsLoading } = useTrips()
  const suspiciousDeleteMutation = useDeleteTrips()

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-between items-center'>
        <p className='font-medium text-xl text-slate-800 my-4'>Ring Trips</p>
        <div className='flex flex-col items-end'>
          <div className='flex gap-1 items-center'>
            <input
              type='checkbox'
              id='toggleSuspicious'
              checked={showSuspicious}
              onChange={() => setShowSuspicious(!showSuspicious)}
            />
            <label htmlFor='toggleSuspicious' className='cursor-pointer'>
              Show Only Suspicious
            </label>
          </div>
          {showSuspicious && (
            <span
              className='text-red-500 cursor-pointer'
              onClick={() =>
                confirm('Delete all suspicious trips?') &&
                suspiciousDeleteMutation.mutate(trips?.filter(filterSuspicious).map((trip) => trip.tripID))
              }
            >
              Delete All Suspicious
            </span>
          )}
        </div>
      </div>

      {isTripsLoading && <p>Loading...</p>}

      {trips &&
        (showSuspicious ? trips.filter(filterSuspicious) : trips).map((trip) => (
          <TripCard key={trip.tripID} trip={trip} />
        ))}
    </div>
  )
}

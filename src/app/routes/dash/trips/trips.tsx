import { useLocalStorage, useSessionStorage } from 'usehooks-ts'
import { useTrips } from '@/features/trips/data/get'
import { useDeleteTrips } from '@/features/trips/data/delete'
import { filterSuspicious } from '@/features/trips/data/filter'
import { TripCard } from '@/features/trips/components/TripCard'
import { DateTime } from 'luxon'
import { DateSelector, TripFilterItem } from '@/features/trips/components/TripFilters'
import toast from 'react-hot-toast'

export default function Trips() {
  const [showSuspicious, setShowSuspicious] = useLocalStorage('sus', false)
  const [startDate, setStartDate] = useSessionStorage('startDate', DateTime.now().minus({ days: 3 }).toISODate())
  const [endDate, setEndDate] = useSessionStorage('endDate', DateTime.now().toISODate())

  const { data: trips, isLoading: isTripsLoading } = useTrips(startDate, endDate)
  const tripDeleteMutation = useDeleteTrips()

  const handleSuspiciousDelete = async () => {
    if (!trips || tripDeleteMutation.isPending) return
    const suspiciousTripIDs = trips.filter(filterSuspicious).map((trip) => trip.tripID)
    try {
      await tripDeleteMutation.mutateAsync(suspiciousTripIDs)
    } catch (error) {
      toast.error('Failed to delete suspicious trips')
    }
  }

  return (
    <div className='w-[75vw]'>
      <div className='flex justify-between items-center mb-4'>
        <p className='font-medium text-xl pl-1'>Ring Trips</p>
        <div className='flex gap-4'>
          <DateSelector startDate={startDate} setStartDate={setStartDate} />
          <DateSelector startDate={endDate} setStartDate={setEndDate} />
          <TripFilterItem onClick={() => setShowSuspicious(!showSuspicious)}>
            <input type='checkbox' readOnly checked={showSuspicious} className='h-4 w-4' />
            <span>Suspicious Trips</span>
          </TripFilterItem>
          {showSuspicious && (
            <TripFilterItem onClick={handleSuspiciousDelete}>
              <span className='text-red-500'>{tripDeleteMutation.isPending ? 'Deleting...' : '  Delete All'}</span>
            </TripFilterItem>
          )}
        </div>
      </div>

      {isTripsLoading && <p className='w-full text-center mt-[10vh]'>Loading...</p>}

      {trips &&
        (showSuspicious ? trips.filter(filterSuspicious) : trips).map((trip) => (
          <TripCard key={trip.tripID} trip={trip} />
        ))}
    </div>
  )
}

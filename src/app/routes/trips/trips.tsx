import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DateTime, Duration } from 'luxon'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { deleteTrip, deleteTrips, fetchTrips, TripData } from '@/features/trips/api'
import { cn } from '@/utils/cn'

export default function Trips() {
  const queryClient = useQueryClient()
  const [showSuspicious, setShowSuspicious] = useLocalStorage('sus', false)

  const { data: trips } = useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  })

  const tripDeleteMutation = useMutation({
    mutationFn: (tripID: string) => deleteTrip(tripID),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const suspiciousDeleteMutation = useMutation({
    mutationFn: (tripIDs?: string[]) => deleteTrips(tripIDs),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const filterSuspicious = (trip: TripData) => {
    const tripDate = DateTime.fromJSDate(new Date(trip.points[0].timestamp))
    const reversePoints = trip.points.slice().reverse()
    const ringColor = reversePoints[0].color.toUpperCase()

    // if live, return false
    const isLive = tripDate.diffNow('minutes').minutes > -3
    if (isLive) return false

    // if starts as red
    if (ringColor === '#FF0000') return true
    // if yellow with unexpected duration or address
    if (ringColor === '#FFFF57') {
      if (trip.duration < 1800 || trip.duration > 4000) return true
      if (!reversePoints[0].address.includes('A2') && !reversePoints[0].address.includes('Garaj')) return true
      if (
        !trip.points[0].address.includes('A2') &&
        !trip.points[0].address.includes('Garaj') &&
        !trip.points[0].address.includes('BOTE-MYO')
      )
        return true
    }
    // if brown with unexpected duration or address
    if (ringColor === '#A64D00') {
      if (trip.duration < 600 || trip.duration > 1400) return true
      if (!reversePoints[0].address.includes('A1')) return true
      if (!trip.points[0].address.includes('A1')) return true
    }

    // if purple with unexpected duration or address
    if (ringColor === '#9600CD') {
      if (trip.duration < 900 || trip.duration > 2000) return true
      if (!reversePoints[0].address.includes('A1')) return true
      if (!trip.points[0].address.includes('A1')) return true
    }
    return false
  }

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

      {trips ? (
        <>
          {(showSuspicious ? trips.filter(filterSuspicious) : trips).map((trip) => {
            const tripDate = DateTime.fromJSDate(new Date(trip.points[0].timestamp))
            const isLive = tripDate.diffNow('minutes').minutes > -3
            return (
              <div
                key={trip.tripID}
                className='flex justify-between items-center border border-slate-300 text-slate-800 rounded-xl p-2 my-4'
              >
                <div>
                  <p>Trip ID: {trip.tripID}</p>
                  <p>Departure: {`${tripDate.toFormat('LLL dd')} ${trip.departure}`}</p>
                  <p>Duration: {Duration.fromObject({ seconds: trip.duration }).toFormat('mm:ss')}</p>
                  <p>Color: {trip.points[trip.points.length - 1].state.split('-').findLast(() => true)}</p>
                  <p>Plate: {trip.plate}</p>
                  <p>Departure Address: {trip.points[trip.points.length - 1].address}</p>
                  {!isLive && <p>Destination Address: {trip.points[0].address}</p>}
                </div>
                <div className='flex flex-col text-center'>
                  {isLive ? (
                    <div className='flex justify-center items-center gap-2 mr-10'>
                      <div className='bg-red-500 rounded-full h-3 w-3' />
                      <p className='text-lg'>Live</p>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-2'>
                      <Link to={`/trips/${trip.tripID}`} className='bg-slate-700 text-white px-6 py-3 rounded-md mr-2'>
                        View Trip
                      </Link>
                      <p
                        className={cn(
                          'bg-red-500 text-white px-6 py-3 rounded-md mr-2 cursor-pointer',
                          tripDeleteMutation.isPending && 'opacity-50'
                        )}
                        onClick={() => tripDeleteMutation.mutate(trip.tripID)}
                      >
                        Delete Trip
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

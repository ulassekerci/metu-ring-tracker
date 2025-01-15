import { useTrip } from '@/features/trips/data/get'
import { DateTime, Duration } from 'luxon'
import { useParams } from 'react-router-dom'
import { useDeleteTrip } from '@/features/trips/data/delete'

export default function Trip() {
  const { tripID } = useParams()
  if (!tripID) return <p>No trip ID provided.</p>

  const { data: trip, error } = useTrip(tripID)
  const deleteMutation = useDeleteTrip()

  return (
    <div className='max-w-screen-xl mx-auto'>
      <p className='font-medium text-xl my-4'>Ring Trip</p>

      {trip ? (
        <>
          <div className='flex justify-between'>
            <div>
              <p>Trip ID: {trip.tripID}</p>
              <p>Departure: {trip.departure}</p>
              <p>Duration: {Duration.fromObject({ seconds: trip.duration }).toFormat('mm:ss')}</p>
              <p>Plate: {trip.plate}</p>
            </div>

            <div>
              <p className='text-red-500 cursor-pointer' onClick={() => deleteMutation.mutate(tripID)}>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete Trip'}
              </p>
            </div>
          </div>

          {trip.points.map((point) => (
            <div key={point.id} className='border border-slate-300 rounded-xl p-2 my-4'>
              <p>Address: {point.address}</p>
              <p>State: {point.state}</p>
              <p>TimeStamp: {DateTime.fromISO(point.timestamp).toFormat('LLL dd HH:mm')}</p>
            </div>
          ))}
        </>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

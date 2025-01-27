import { useTrip } from '@/features/trips/data/get'
import { DateTime, Duration } from 'luxon'
import { useParams } from 'react-router-dom'
import { useDeleteTripAndRedirect } from '@/features/trips/data/delete'
import Button from '@/components/Button'

export default function Trip() {
  const { tripID } = useParams()
  if (!tripID) return <p>No trip ID provided.</p>

  const { data: trip, error } = useTrip(tripID)
  const deleteMutation = useDeleteTripAndRedirect()

  return (
    <div className='w-[75vw]'>
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
              <Button
                className='px-6 py-3'
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(tripID)}
              >
                Delete Trip
              </Button>
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTrip, fetchTrip } from '../helpers/tripFetchers'
import { DateTime, Duration } from 'luxon'
import { useNavigate, useParams } from 'react-router-dom'

export default function Trip() {
  const { tripID } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  if (!tripID) return <p>No trip ID provided.</p>

  const { data: trip, error } = useQuery({
    queryKey: ['trips', tripID],
    queryFn: () => fetchTrip(tripID),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteTrip(tripID),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['trips', tripID] }),
    onSuccess: () => navigate('/trips'),
  })

  return (
    <div className='max-w-screen-xl mx-auto'>
      <p className='font-medium text-xl text-slate-800 my-4'>Ring Trip</p>

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
              <p className='text-red-500 cursor-pointer' onClick={() => deleteMutation.mutate()}>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete Trip'}
              </p>
            </div>
          </div>

          {trip.points.map((point) => (
            <div key={point.id} className='border border-slate-300 text-slate-800 rounded-xl p-2 my-4'>
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

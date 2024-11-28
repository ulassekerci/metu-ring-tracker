import { DateTime, Duration } from 'luxon'
import { TripData } from '../data/get'
import { Link } from 'react-router-dom'
import { useDeleteTrip } from '../data/delete'
import { cn } from '@/utils/cn'

export const TripCard = ({ trip }: { trip: TripData }) => {
  const tripDate = DateTime.fromJSDate(new Date(trip.points[0].timestamp))
  const isLive = tripDate.diffNow('minutes').minutes > -3
  const tripDeleteMutation = useDeleteTrip()

  return (
    <div className='flex justify-between items-center border border-slate-300 text-slate-800 rounded-xl p-2 my-4'>
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
}

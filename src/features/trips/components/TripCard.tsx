import { DateTime, Duration } from 'luxon'
import { TripData } from '../data/get'
import { Link } from 'react-router-dom'
import { useDeleteTrip } from '../data/delete'
import Button from '@/components/Button'

export const TripCard = ({ trip }: { trip: TripData }) => {
  const tripDate = DateTime.fromJSDate(new Date(trip.points[0].timestamp))
  const isLive = tripDate.diffNow('minutes').minutes > -3
  const tripDeleteMutation = useDeleteTrip()

  return (
    <div className='flex justify-between items-center border border-slate-300 rounded-xl p-2 my-4'>
      <div>
        <p>Trip ID: {trip.tripID}</p>
        <p>Departure: {`${tripDate.minus({ hours: 3 }).toFormat('LLL dd')} ${trip.departure}`}</p>
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
          <div className='flex flex-col gap-2 px-2'>
            <Link to={`/trips/${trip.tripID}`}>
              <Button className='bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 w-36'>View Trip</Button>
            </Link>
            <Button
              className='px-6 py-3 cursor-pointer'
              disabled={tripDeleteMutation.isPending}
              onClick={() => tripDeleteMutation.mutate(trip.tripID)}
            >
              Delete Trip
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

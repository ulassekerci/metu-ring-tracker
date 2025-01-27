import { getColorTrip, getNextTrip, useSchedule } from '../data/schedule'
import { DateTime } from 'luxon'

export const InfoBox = () => {
  const { data: schedule } = useSchedule()

  if (!schedule) return null
  const nextTrip = getNextTrip(schedule)
  const nextTripColor = getColorTrip(nextTrip?.color)
  const nextTripTime = DateTime.fromFormat(nextTrip.time, 'HH:mm:ss').toFormat('HH.mm')

  return (
    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-96'>
      <div className='h-14 bg-primary rounded-xl flex justify-between items-center px-4 text-white'>
        <div className='flex items-center'>
          <span className='font-semibold mr-1'>Sıradaki:</span>
          <span className='font-medium'>{nextTripColor}</span>
        </div>
        <span className='font-medium'>{nextTripTime}</span>
      </div>
    </div>
  )
}

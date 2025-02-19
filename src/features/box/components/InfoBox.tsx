import { getRingNameFromColor, getNextTrip, useSchedule } from '../data/schedule'
import { DateTime } from 'luxon'
import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { cn } from '@/utils/cn'
import { BusDisplay, GhostDisplay } from './PinData'

export const InfoBox = () => {
  const { data: schedule } = useSchedule()
  const { selected } = useInfoBoxStore()

  if (!schedule) return null
  const nextTrip = getNextTrip(schedule)
  const nextTripColor = getRingNameFromColor(nextTrip?.color)
  const nextTripTime = DateTime.fromFormat(nextTrip.time, 'HH:mm:ss').toFormat('HH.mm')

  return (
    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-96 shadow-xl'>
      <motion.div
        initial={{ height: 56 }}
        animate={{ height: selected ? 168 : 56 }}
        className={cn('rounded-xl', selected ? 'bg-white' : 'bg-primary text-white')}
      >
        <div>
          {!selected && (
            <div className='flex items-center justify-between w-full h-14 px-4'>
              <div className='flex items-center'>
                <span className='font-semibold mr-1'>Sıradaki:</span>
                <span className='font-medium'>{nextTripColor}</span>
              </div>
              <span className='font-medium'>{nextTripTime}</span>
            </div>
          )}
          {selected === 'ghost' && <GhostDisplay />}
          {selected === 'bus' && <BusDisplay />}
        </div>
      </motion.div>
    </div>
  )
}

import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { cn } from '@/utils/cn'
import { BusDisplay } from './PinData'
import { getNextTrip, getRingNameFromColor, useSchedule } from '../data/schedule'

export const InfoBox = () => {
  const { data: schedule } = useSchedule()
  const { selected } = useInfoBoxStore()

  if (!schedule) return null
  const nextTrip = getNextTrip(schedule)
  // TODO: Try displaying multiple colors (19.00 and 20.00 rings)
  const nextTripColor = getRingNameFromColor(nextTrip.line.colors[0])
  console.log(nextTrip)

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
              <span className='font-medium'>{nextTrip.time.toHuman()}</span>
            </div>
          )}
          {selected && <BusDisplay />}
        </div>
      </motion.div>
    </div>
  )
}

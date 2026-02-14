import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { cn } from '@/utils/cn'
import { PinDataDisplay } from './PinData'
import { getNextTrip, useSchedule } from '../data/schedule'
import { getColorName, getRingLineGradient } from '@/lib/colors'

export const InfoBox = () => {
  const { data: schedule } = useSchedule()
  const { selected } = useInfoBoxStore()

  if (!schedule) return null
  const nextTrip = getNextTrip(schedule)
  const nextTripColor = nextTrip.line.colors[0]
  // TODO: Try displaying multiple lines (19.00 and 20.00 rings)
  const nextTripColorName = getColorName(nextTripColor)
  const gradient = getRingLineGradient(nextTripColor)

  return (
    <div className='absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-96 shadow-xl'>
      <motion.div
        initial={{ height: 56 }}
        animate={{ height: selected ? 168 : 56 }}
        className={cn('rounded-xl')}
        style={{
          background: selected ? 'white' : `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`,
          color: selected ? 'inherit' : 'white',
        }}
      >
        <div>
          {!selected && (
            <div className='flex items-center justify-between w-full h-14 px-4'>
              <div className='flex items-center'>
                <span className='font-semibold mr-1'>Sıradaki:</span>
                <span className='font-medium'>{nextTripColorName} Ring</span>
              </div>
              <span className='font-medium'>{nextTrip.time.toHuman()}</span>
            </div>
          )}
          {selected && <PinDataDisplay />}
        </div>
      </motion.div>
    </div>
  )
}

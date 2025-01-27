import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { XIcon } from 'lucide-react'
import { getColorName } from '@/lib/colors'
import { DateTime } from 'luxon'
import { useLiveData } from '@/features/pins/data/live'

export const GhostDisplay = () => {
  const { selected, ghostData, closeBox } = useInfoBoxStore()
  if (!ghostData) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>{getColorName(ghostData?.color, 'tr') + ' Hayalet'}</span>
        <XIcon className='cursor-pointer h-5 w-5' onClick={closeBox} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.1 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>Kalkış:</span>
        <span className='font-medium'>{DateTime.fromFormat(ghostData.departure, 'HH:mm:ss').toFormat('HH.mm')}</span>
      </motion.div>
    </>
  )
}

export const BusDisplay = () => {
  const { data: liveData } = useLiveData()
  const { selected, busData, closeBox } = useInfoBoxStore()
  if (!busData) return null
  const vehicle = liveData?.vehicles.find((v) => v.plate === busData.id)
  const liveDeparture = vehicle?.departure
  const departureText = liveDeparture ? DateTime.fromFormat(liveDeparture, 'HH:mm:ss').toFormat('HH.mm') : 'Bilinmiyor'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>{getColorName(busData?.clr, 'tr') + ' Ring'}</span>
        <XIcon className='cursor-pointer h-5 w-5' onClick={closeBox} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.1 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Hız:</span>
        <span className='text-slate-700'>{busData.sp} km/h</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.2 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Kalkış:</span>
        <span className='text-slate-700'>{departureText}</span>
      </motion.div>
    </>
  )
}

import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { XIcon } from 'lucide-react'
import { getColorName } from '@/lib/colors'
import { useLiveData } from '@/features/pins/data/live'
// import { DateTime } from 'luxon'
// import { useLiveData } from '@/features/pins/data/live'
// import { useGhostData } from '@/features/pins/data/ghosts'

export const BusDisplay = () => {
  const { data: liveData } = useLiveData()
  const { selected, busData, closeBox } = useInfoBoxStore()
  if (!busData) return null
  const trip = liveData?.find((v) => v.vehicle.plate === busData.plate)
  const liveDeparture = trip?.departureTime
  const departureText = liveDeparture ?? 'Bilinmiyor'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>{getColorName(busData?.color, 'tr') + ' Ring'}</span>
        <XIcon className='cursor-pointer h-5 w-5' onClick={closeBox} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.1 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Kalkış</span>
        <span className='text-slate-700'>{departureText}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.2 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Araç</span>
        <span className='text-slate-700'>{trip?.vehicle.brand + ' ' + trip?.vehicle.model}</span>
      </motion.div>
    </>
  )
}

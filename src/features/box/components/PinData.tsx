import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { XIcon } from 'lucide-react'
import { getColorName } from '@/lib/colors'
// import { DateTime } from 'luxon'
// import { useLiveData } from '@/features/pins/data/live'
// import { useGhostData } from '@/features/pins/data/ghosts'

export const GhostDisplay = () => {
  const { selected, ghostData, closeBox } = useInfoBoxStore()
  if (!ghostData) return null
  // const { data: liveGhostData } = useGhostData()
  // const selectedGhost = liveGhostData?.find((live) => live.departure === ghostData.departure)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>{getColorName(ghostData?.point.color, 'tr') + ' Hayalet'}</span>
        <XIcon className='cursor-pointer h-5 w-5' onClick={closeBox} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.1 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Kalkış</span>
        <span>{ghostData.departure}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.2 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Trip ID</span>
        {ghostData.id}
      </motion.div>
    </>
  )
}

export const BusDisplay = () => {
  // const { data: liveData } = useLiveData()
  const { selected, busData, closeBox } = useInfoBoxStore()
  if (!busData) return null
  // const vehicle = liveData?.vehicles.find((v) => v.plate === busData.plate)
  // const liveDeparture = vehicle?.departure
  // const departureText = liveDeparture ? DateTime.fromFormat(liveDeparture, 'HH:mm:ss').toFormat('HH.mm') : 'Bilinmiyor'

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
        {/* <span className='text-slate-700'>{departureText}</span> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: selected ? 1 : 0, display: selected ? 'flex' : 'none' }}
        transition={{ delay: 0.2 }}
        className='items-center justify-between w-full h-14 px-4'
      >
        <span className='font-medium'>Araç</span>
        <span className='text-slate-700'>{busData.color}</span>
      </motion.div>
    </>
  )
}

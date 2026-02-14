import { motion } from 'motion/react'
import { useInfoBoxStore } from '../store'
import { XIcon } from 'lucide-react'
import { getColorName } from '@/lib/colors'
import { ServiceTime } from '@/lib/ServiceTime'
import { useLiveData } from '@/features/pins/data/live'
import { useGhostData } from '@/features/pins/data/ghosts'
import { getErrorMargin } from '../data/errorMargin'

export const PinDataDisplay = () => {
  const { data: liveData } = useLiveData()
  const { data: ghostLiveData } = useGhostData()

  const { selected, busData, ghostData, closeBox } = useInfoBoxStore()

  let color = ''
  let departureText = 'Bilinmiyor'
  let vehicleText = 'Bilinmiyor'
  let errorMarginText = 'Bilinmiyor'

  if (!selected) return null
  if (selected === 'bus') {
    if (!busData) return null
    const selectedTrip = liveData?.find((trip) => trip.vehicle.plate === busData.plate)
    if (!selectedTrip) return null
    color = getColorName(selectedTrip.color)
    const departureData = selectedTrip?.departureTime
    if (departureData) {
      const departureTime = new ServiceTime(departureData)
      departureText = departureTime.toHuman()
    }
    if (selectedTrip.isParked) departureText = 'Park Edilmiş'
    const vehicleData = selectedTrip?.vehicle
    if (vehicleData?.brand && vehicleData.model && vehicleData.doors) {
      vehicleText = `${vehicleData.brand} ${vehicleData.model} (${vehicleData.doors} kapı)`
    }
  }
  if (selected === 'ghost') {
    if (!ghostData) return null
    const selectedDeparture = ghostLiveData?.find((dep) => dep.departure.seconds === ghostData.departure.seconds)
    if (selectedDeparture) {
      color = getColorName(selectedDeparture.average.color)
      departureText = selectedDeparture?.departure.toHuman()
      const errorMargin = getErrorMargin(selectedDeparture.trips.map((t) => t.closestPointToNow.distanceTraveled))
      errorMarginText = errorMargin
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        className='flex items-center justify-between w-full h-14 px-4'
      >
        <span className='font-semibold'>{color + ' Ring'}</span>
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
        {selected === 'bus' ? (
          <>
            <span className='font-medium'>Araç</span>
            <span className='text-slate-700'>{vehicleText}</span>
          </>
        ) : (
          <>
            <span className='font-medium'>Hata Payı</span>
            <span className='text-slate-700'>{errorMarginText}</span>
          </>
        )}
      </motion.div>
    </>
  )
}

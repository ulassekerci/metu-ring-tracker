import { Marker } from 'react-map-gl'
import { LivePoint } from '../data/live'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { MiddlePoint, RingLog } from '../data/ghosts'
import { Ghost } from './Ghost'
import { cn } from '@/utils/cn'

export const GhostPin = ({ point, opaque = false }: { point: MiddlePoint; opaque?: boolean }) => {
  const { selected, ghostData, setGhostData } = useInfoBoxStore()
  if (selected === 'ghost' && ghostData?.departure !== point.departure) return null
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} className={cn(opaque && 'opacity-75')} onClick={() => setGhostData(point)} />
    </Marker>
  )
}

export const BusPin = ({ point }: { point: LivePoint }) => {
  const { busData, setBusData } = useInfoBoxStore()
  if (busData?.id === point.id) setBusData(point)

  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src={getFileName(point.clr)} onClick={() => setBusData(point)} />
    </Marker>
  )
}

export const OtherGhostPin = ({ point }: { point: RingLog }) => {
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} />
    </Marker>
  )
}

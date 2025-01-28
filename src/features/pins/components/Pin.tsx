import { Marker } from 'react-map-gl'
import { LivePoint } from '../data/live'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { AvgPoint, RingLog } from '../data/average'
import { Ghost } from './Ghost'

export const GhostPin = ({ point }: { point: AvgPoint }) => {
  const { selected, ghostData, setGhostData } = useInfoBoxStore()
  if (selected === 'ghost' && ghostData?.departure !== point.departure) return null
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} onClick={() => setGhostData(point)} />
    </Marker>
  )
}

export const BusPin = ({ point }: { point: LivePoint }) => {
  const { setBusData } = useInfoBoxStore()
  const ringIcon = getFileName(point.clr)
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src={ringIcon} onClick={() => setBusData(point)} />
    </Marker>
  )
}

export const OtherGhostPin = ({ point }: { point: RingLog }) => {
  const { selected } = useInfoBoxStore()
  if (selected !== 'ghost') return null
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} />
    </Marker>
  )
}

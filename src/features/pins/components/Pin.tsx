import { Marker } from 'react-map-gl'
import { LivePoint } from '../data/live'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { Ghost } from './Ghost'
import { RingPoint, TripPoint } from '../data/ghosts'

export const GhostPin = ({ tPoint }: { tPoint: TripPoint }) => {
  const { selected, ghostData, setGhostData } = useInfoBoxStore()
  if (selected === 'ghost' && ghostData?.departure !== tPoint.departure) return null
  return (
    <Marker longitude={Number(tPoint.point.lng)} latitude={Number(tPoint.point.lat)}>
      <Ghost color={tPoint.point.color} onClick={() => setGhostData(tPoint)} />
    </Marker>
  )
}

export const BusPin = ({ point }: { point: LivePoint }) => {
  const { setBusData } = useInfoBoxStore()
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src={getFileName(point.color)} onClick={() => setBusData(point)} />
    </Marker>
  )
}

export const OtherGhostPin = ({ point }: { point: RingPoint }) => {
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} />
    </Marker>
  )
}

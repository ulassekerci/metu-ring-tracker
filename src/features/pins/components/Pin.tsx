import { Marker } from 'react-map-gl'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { ClosestPoint, GhostData, RingTrip } from '@/interfaces'
import { Ghost } from './Ghost'

export const BusPin = ({ point }: { point: ClosestPoint }) => {
  const { setBusData } = useInfoBoxStore()
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src={getFileName(point.color)} onClick={() => setBusData(point)} />
    </Marker>
  )
}

export const GhostPin = ({ data }: { data: GhostData }) => {
  const { setGhostData } = useInfoBoxStore()
  const avgPoint = data.average.closestPointToNow
  return (
    <Marker longitude={Number(avgPoint.lng)} latitude={Number(avgPoint.lat)}>
      <Ghost color={avgPoint.color} onClick={() => setGhostData(data)} />
    </Marker>
  )
}

export const OtherGhostsPin = ({ data }: { data: RingTrip }) => {
  const point = data.closestPointToNow
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} />
    </Marker>
  )
}

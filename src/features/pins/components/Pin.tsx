import { Marker } from 'react-map-gl'
import { LivePoint } from '../data/live'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { AvgPoint } from '../data/average'
import { Ghost } from './Ghost'

export const GhostPin = ({ point }: { point: AvgPoint }) => {
  const { setGhostData } = useInfoBoxStore()

  return (
    <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost data={point} onClick={() => setGhostData(point)} />
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

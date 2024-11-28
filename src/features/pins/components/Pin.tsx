import { Marker } from 'react-map-gl'
import { AvgPoint } from '../data/average'
import { Ghost } from './Ghost'
import { LivePoint } from '../data/live'

export const GhostPin = ({ point }: { point: AvgPoint }) => {
  return (
    <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <Ghost color={point.color} />
    </Marker>
  )
}

export const BusPin = ({ point }: { point: LivePoint }) => {
  return (
    <Marker key={point.id} longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src='./favicon.ico' />
    </Marker>
  )
}

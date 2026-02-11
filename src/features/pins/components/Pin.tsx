import { Marker } from 'react-map-gl'
import { getFileName } from '@/lib/colors'
import { useInfoBoxStore } from '@/features/box/store'
import { RingPoint } from '@/interfaces'

export const BusPin = ({ point }: { point: RingPoint }) => {
  const { setBusData } = useInfoBoxStore()
  return (
    <Marker longitude={Number(point.lng)} latitude={Number(point.lat)}>
      <img width={24} height={24} src={getFileName(point.color)} onClick={() => setBusData(point)} />
    </Marker>
  )
}

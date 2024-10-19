export interface RingData {
  lat: string // latitude
  lng: string // longitude
  addr: string // address
  dir: number // direction
  sp: string // speed
  clr: string // color
  ago: number // data age
  key: string // name
  id: string // license plate
}

export interface VehicleTrip {
  tripID: string
  plate: string
}

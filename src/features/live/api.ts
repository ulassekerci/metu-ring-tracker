import axios from 'axios'

export interface AvgPoint {
  id: number
  lat: string
  lng: string
  address: string
  color: string
  departure: string
  time: string
}

export const fetchAverages = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/averages`)
  return response.data as AvgPoint[]
}

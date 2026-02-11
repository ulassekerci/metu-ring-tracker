import { api } from '@/lib/queryClient'
import { ServiceTime } from '@/lib/ServiceTime'
import { useQuery } from '@tanstack/react-query'

export interface RingLine {
  name: string
  departures: number[]
  weekend: boolean
  colors: string[]
}

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const response = await api.get<RingLine[]>(`/schedule`)
      return response.data
    },
  })
}

export const getNextTrip = (lines: RingLine[]) => {
  const isWeekend = ServiceTime.now().isWeekend
  const filteredLines = lines.filter((line) => line.weekend === isWeekend)
  let nextTripOfDay: { time: ServiceTime; line: RingLine } | null = null

  filteredLines.forEach((line) => {
    line.departures.forEach((departure) => {
      const depServiceTime = new ServiceTime(departure)
      if (!nextTripOfDay) nextTripOfDay = { time: depServiceTime, line }
      const now = ServiceTime.now()
      const newDifference = depServiceTime.diff(now).as('minutes')
      const oldDifference = nextTripOfDay.time.diff(now).as('minutes')
      if (newDifference < oldDifference) nextTripOfDay = { time: depServiceTime, line }
    })
  })

  return nextTripOfDay || { time: new ServiceTime(filteredLines[0].departures[0]), line: filteredLines[0] }
}

export const getRingNameFromColor = (color: string) => {
  const upperCaseColor = color.toUpperCase()
  switch (upperCaseColor) {
    case '#FF0000':
      return 'Sarı-Kırmızı Ring'
    case '#FFFF57':
      return 'Sarı-Kırmızı Ring'
    case '#9600CD':
      return 'Mor Ring'
    case '#A64D00':
      return 'Kahverengi Ring'
    case '#0000FF':
      return 'Lacivert Ring'
    case '#737373':
      return 'Gri Ring'
    default:
      return upperCaseColor + ' Ring'
  }
}

import { DateSelector } from '@/features/trips/components/TripFilters'
import { DateTime } from 'luxon'
import { useState } from 'react'

export default function Stats() {
  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 3 }).toISODate())
  const [endDate, setEndDate] = useState(DateTime.now().toISODate())

  return (
    <div className='flex flex-col gap-4 w-[75vw]'>
      <div className='flex justify-between items-center mb-4'>
        <p className='font-medium text-xl pl-1'>Ring Trips</p>
        <div className='flex gap-4'>
          <DateSelector startDate={startDate} setStartDate={setStartDate} />
          <DateSelector startDate={endDate} setStartDate={setEndDate} />
        </div>
      </div>
      <div className='flex gap-4'>
        <StatCard title='Total Trips'>
          <span className='mt-8 mb-2'>test</span>
        </StatCard>
      </div>
    </div>
  )
}

const StatCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='flex flex-col border border-slate-300 rounded-xl p-2 my-4 min-w-96'>
    <p className='text-lg'>{title}</p>
    {children}
  </div>
)

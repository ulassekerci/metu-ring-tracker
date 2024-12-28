import { Dispatch, SetStateAction } from 'react'

export const DateSelector = ({
  startDate,
  setStartDate,
}: {
  startDate: string
  setStartDate: Dispatch<SetStateAction<string>>
}) => {
  return (
    <input
      type='date'
      value={startDate}
      min='2024-10-22'
      max={new Date().toISOString().split('T')[0]}
      onChange={(e) => setStartDate(e.target.value)}
      className='border border-slate-300 rounded-md h-10 px-4'
    />
  )
}

export const TripFilterItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className='flex items-center border border-slate-300 rounded-md h-10 px-4 gap-2 hover:bg-slate-100 cursor-pointer select-none'
    >
      {children}
    </div>
  )
}

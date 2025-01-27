export default function Stats() {
  return (
    <div className='flex flex-col gap-4 w-[75vw]'>
      <div className='flex justify-between items-center h-10 mb-4'>
        <p className='font-medium text-xl pl-1'>Statistics</p>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <StatCard title='Total Trips'>test</StatCard>
        <StatCard title='Total Trips'>test2</StatCard>
        <StatCard title='Total Trips'>test3</StatCard>
        <StatCard title='Total Trips'>test4</StatCard>
        <StatCard title='Total Trips'>test5</StatCard>
      </div>
    </div>
  )
}

const StatCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='flex flex-col border border-slate-300 rounded-xl p-2 my-4 min-w-80'>
    <p className='text-lg mb-4'>{title}</p>
    {children}
  </div>
)

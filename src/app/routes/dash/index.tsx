import { cn } from '@/utils/cn'
import { ClockIcon, HomeIcon, RouteIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const routes = [
  { name: 'Home', path: '/dashboard', icon: <HomeIcon size={24} /> },
  { name: 'Trips', path: '/dashboard/trips', icon: <RouteIcon size={24} /> },
  { name: 'Schedule', path: '/dashboard/schedule', icon: <ClockIcon size={24} /> },
]

export default function Dashboard() {
  return (
    <div className='flex'>
      <div className='w-[20vw] p-4 h-full'>
        <p className='font-medium text-xl my-4 text-center mb-12'>RingTahmin</p>
        <nav className='flex flex-col gap-2 items-center text-slate-500'>
          {routes.map((route) => (
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 w-48 h-14 rounded-xl px-4',
                  isActive ? 'bg-primary text-white' : 'hover:bg-zinc-100'
                )
              }
              end={route.path === '/dashboard'}
            >
              {route.icon}
              <span className='font-normal text-lg'>{route.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className='max-w-[80vw] min-h-screen p-4 border-l border-slate-300'>
        <Outlet />
      </div>
    </div>
  )
}

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/app/routes/home'
import Trips from '@/app/routes/dash/trips/trips'
import Trip from '@/app/routes/dash/trips/trip'
import { Login } from './routes/login'
import Stats from './routes/dash/stats'
import Dashboard from './routes/dash'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: '', element: <Stats /> },
      { path: 'trips', element: <Trips /> },
      { path: 'trips/:tripID', element: <Trip /> },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

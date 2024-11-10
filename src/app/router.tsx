import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/app/routes/home'
import Trips from '@/app/routes/trips/trips'
import Trip from '@/app/routes/trips/trip'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/trips', element: <Trips /> },
  { path: '/trips/:tripID', element: <Trip /> },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

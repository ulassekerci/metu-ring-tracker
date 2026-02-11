import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/app/routes/home'

const router = createBrowserRouter([{ path: '/', element: <Home /> }])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

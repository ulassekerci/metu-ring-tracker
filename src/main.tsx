import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './helpers/queryClient'
import Home from './Home'
import Trips from './trips/Trips'
import Trip from './trips/Trip'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/trips', element: <Trips /> },
  { path: '/trips/:tripID', element: <Trip /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)

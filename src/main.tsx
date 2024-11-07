import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Map from './Map'
import Trips from './trips/Trips'
import { QueryClientProvider } from '@tanstack/react-query'
import Trip from './trips/Trip'
import { queryClient } from './helpers/queryClient'

const router = createBrowserRouter([
  { path: '/', element: <Map /> },
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

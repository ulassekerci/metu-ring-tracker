import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import '@/tailwind.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Settings } from 'luxon'

Settings.defaultZone = 'Europe/Istanbul'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

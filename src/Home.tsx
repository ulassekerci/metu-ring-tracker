import Map from 'react-map-gl/maplibre'

export default function Home() {
  return (
    <Map
      initialViewState={{
        longitude: 32.778,
        latitude: 39.891,
        zoom: 13.15,
      }}
      style={{ height: '100vh' }}
      mapStyle='https://tiles.openfreemap.org/styles/bright'
      attributionControl={false}
    />
  )
}

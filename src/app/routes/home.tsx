import Map from 'react-map-gl/maplibre'

export default function Home() {
  return (
    <Map
      initialViewState={{
        longitude: 32.778,
        latitude: 39.89,
        zoom: 13.09,
      }}
      style={{ height: '100vh' }}
      mapStyle='/mapstyle.json'
      attributionControl={false}
    />
  )
}

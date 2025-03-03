import {
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Marker,
  Popup,
  MapContainer,
} from 'react-leaflet'
import {
  Marker as LaefletMarker
} from 'leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { LAT_LNG } from '../../constants'
import type { MapStreet } from '../../types'
import 'leaflet/dist/leaflet.css'

type MapProps = {
  position: typeof LAT_LNG
  setMapStreet: (data: MapStreet) => void
  setPosition: (data: typeof LAT_LNG) => void
}

function DraggableMarker({ 
  position,
  setPosition,
}: MapProps) {
  const markerRef = useRef(null)
  const [draggable, setDraggable] = useState(true)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: LaefletMarker = markerRef.current!
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

export default function MyMap({ 
  position,
  setPosition,
  setMapStreet
}: MapProps) {
  return (
    <MapContainer
      center={LAT_LNG}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full min-h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <DraggableMarker 
        position={position}
        setPosition={setPosition}
        setMapStreet={setMapStreet}   
      />
    </MapContainer>
  )
}

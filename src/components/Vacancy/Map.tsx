import {
  useCallback,
  useEffect,
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
  setMapStreet: (data: MapStreet) => void
}

function DraggableMarker({ setMapStreet }: MapProps) {
  const markerRef = useRef(null)
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState(LAT_LNG)

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

  const handleGetPositionData = async () => {
    try {
      const { lat, lng } = position;
      const URL = import.meta.env.VITE_URL_STREET_MAP;
      const url = `${URL}${lat}&lon=${lng}`;
      const response = await fetch(url);
      const data: MapStreet = await response.json();
      if (data.address) {
        setMapStreet({
          address: data.address,
          lat: data.lat,
          lon: data.lon,
          display_name: data.display_name
        })
      }
    } catch (error) {
      console.error("Ocurrió un error al obtener la dirección", error);
    }
  }

  useEffect(() => {
    handleGetPositionData()
  }, [position])

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

export default function MyMap({ setMapStreet }: MapProps) {
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
      <DraggableMarker setMapStreet={setMapStreet} />
    </MapContainer>
  )
}

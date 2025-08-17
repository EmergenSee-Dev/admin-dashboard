'use client';

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center: [number, number] = [9.082, 8.6753];
const zoomLevel = 6;

// Dynamically import the MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const MultiplePinMap = ({ data = [] }: { data: any[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={containerStyle} className="flex items-center justify-center bg-gray-100">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <MapContainer 
        center={center} 
        zoom={zoomLevel} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Array.isArray(data) && data.map((location) => {
          if (!location?.lat || !location?.lng) return null;
          return (
            <Marker 
              key={location?._id || `${location.lat}-${location.lng}`} 
              position={[location.lat, location.lng]}
            >
              <Popup>{location?.address || 'No address provided'}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MultiplePinMap;

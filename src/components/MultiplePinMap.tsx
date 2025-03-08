import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const containerStyle = {
  width: "100%",
  height: "500px", // Adjust height as needed
};

const center: [number, number] = [9.082, 8.6753];
const zoomLevel = 6;

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MultiplePinMap = ({ data }: { data: any }) => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading map...</p>;



  // useEffect(() => {
  //   const fetchCoordinates = async () => {
  //     const newLocations = await Promise.all(
  //       data.map(async (address) => {
  //         try {
  //           // Append ", Nigeria" to help improve accuracy
  //           const query = `${encodeURIComponent(address.address)}, Nigeria`;

  //           const response = await fetch(
  //             `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  //           );

  //           const result = await response.json();

  //           if (result.length > 0) {
  //             const { lat, lon } = result[0];
  //             return {
  //               id: address.id,
  //               name: address.name,
  //               lat: parseFloat(lat),
  //               lng: parseFloat(lon)
  //             };
  //           } else {
  //             console.error(`Geocoding failed for: ${address.address}`);
  //             return null;
  //           }
  //         } catch (error) {
  //           console.error(`Error fetching geolocation for ${address.address}:`, error);
  //           return null;
  //         }
  //       })
  //     );

  //     setLocations(newLocations.filter((loc) => loc !== null));
  //   };

  //   fetchCoordinates();
  // }, [data]);

  return (
    <MapContainer center={center} zoom={zoomLevel} style={containerStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((location: any) => (
        <Marker key={location?._id} position={[location?.lat, location?.lng]} icon={customIcon}>
          <Popup>{location?.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultiplePinMap;

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const API_KEY = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // Replace with your actual API key

const containerStyle = {
  width: "100%",
  height: "500px", // Adjust height as needed
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)


const MultiplePinMap = ({ data }: { data: any }) => {
  const [locations, setLocations] = useState<{ id: number; name: string; lat: number; lng: number }[]>([]);


  useEffect(() => {
    console.log(data)
    const fetchCoordinates = async () => {
      const newLocations = await Promise.all(
        data.map(async (address: { address: string | number | boolean; id: any; name: any; }) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address.address
              )}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.status === "OK") {
              const { lat, lng } = data.results[0].geometry.location;
              return { id: address.id, name: address.name, lat, lng };
            } else {
              console.error("Geocoding failed:", data.status);
              return null;
            }
          } catch (error) {
            console.error("Error fetching geolocation:", error);
            return null;
          }
        })
      );

      setLocations(newLocations.filter((loc) => loc !== null));
    };

    fetchCoordinates();
  }, []);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
        {locations.map((location) => (
          <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MultiplePinMap;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { db } from "../lib/firestore";

// Importing icons from public folder
const customIcon = new L.Icon({
  iconUrl: "/ship.png",  // Path relative ke folder public
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to auto-zoom to markers
const AutoZoom = ({ coordinates }) => {
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = coordinates.map(coord => [coord.lat, coord.lon]); // Create bounds from coordinates
      map.fitBounds(bounds); // Auto zoom to show all markers
    }
  }, [coordinates, map]);

  return null;
};

const MonitoringCam = () => {
  const [coordinates, setCoordinates] = useState([]); // State untuk menyimpan data latitude dan longitude

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinatesRef = query(ref(db, '/sensorData'), limitToLast(5)); // Mengambil 5 data terakhir

      const dataPromise = new Promise((resolve, reject) => {
        onValue(coordinatesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const latestCoordinates = Object.values(data).map(item => ({
              lat: item.latitude,
              lon: item.longitude,
            }));

            resolve(latestCoordinates);
          } else {
            reject("No data available");
          }
        }, (error) => {
          reject(error);
        });
      });

      try {
        const latestCoordinates = await dataPromise;

        // Cek apakah ada data yang duplikat sebelum menambahkannya ke state
        setCoordinates(prevCoordinates => {
          const newCoordinates = latestCoordinates.filter(coord => {
            return !prevCoordinates.some(existingCoord =>
              existingCoord.lat === coord.lat && existingCoord.lon === coord.lon
            );
          });
          return [...prevCoordinates, ...newCoordinates];
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <div className="bg-[#2992BE] px-6 py-8 rounded-xl">
      <h1 className="mb-6 text-xl text-white font-medium">📍 Monitoring Map</h1>
      <div className="sm:w-[35vw] h-[35vh] shadow-md rounded-xl">
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Auto zoom component */}
          <AutoZoom coordinates={coordinates} />

          {/* Render markers */}
          {coordinates.map((coord, index) => (
            <Marker key={index} position={[coord.lat, coord.lon]} icon={customIcon}>
              <Popup>
                Latitude: {coord.lat}, Longitude: {coord.lon}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MonitoringCam;

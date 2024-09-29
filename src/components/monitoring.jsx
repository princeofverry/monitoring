import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { db } from "../lib/firestore";

// Importing icons from public folder
const customIcon = new L.Icon({
  iconUrl: "/ship.png",  // Path relative ke folder public
  iconSize: [25, 25],    // Ukuran ikon
  iconAnchor: [12, 25],  // Posisi anchor sesuai ukuran ikon (ditaruh di bagian bawah ikon)
  popupAnchor: [1, -34],
});

// Component to auto-zoom to markers and track the path
const AutoZoom = ({ coordinates }) => {
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = coordinates.map(coord => [coord.lat, coord.lon]); // Create bounds from coordinates
      map.fitBounds(bounds); // Auto zoom to show all markers and polyline
    }
  }, [coordinates, map]);

  return null;
};

const MonitoringCam = () => {
  const [coordinates, setCoordinates] = useState([]); // State untuk menyimpan data latitude dan longitude
  const [track, setTrack] = useState([]); // State untuk menyimpan lintasan (tracking path)

  useEffect(() => {
    const fetchCoordinates = () => {
      const coordinatesRef = query(ref(db, '/sensorData'), limitToLast(5)); // Mengambil 5 data terakhir

      // Listener untuk data Firebase secara real-time
      onValue(coordinatesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const latestCoordinates = Object.values(data).map(item => ({
            lat: item.latitude,
            lon: item.longitude,
          }));

          // Update state untuk tracking
          setCoordinates(latestCoordinates);
          setTrack(prevTrack => [...prevTrack, ...latestCoordinates]); // Menambah koordinat ke track lintasan
        } else {
          console.error("No data available");
        }
      }, (error) => {
        console.error(error);
      });
    };

    fetchCoordinates();
  }, []); // Kosongkan dependencies agar listener dijalankan sekali saat component dimount

  return (
    <div className="bg-[#2992BE] px-6 py-8 rounded-xl">
      <h1 className="mb-6 text-xl text-white font-medium">📍 Monitoring Map</h1>
      <div className="sm:w-[35vw] h-[35vh] shadow-md rounded-xl">
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%", borderRadius: "12px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Auto zoom component */}
          <AutoZoom coordinates={track} />

          {/* Render polyline for tracking path - Diupdate untuk mengikuti marker */}
          {track.length > 1 && (
            <Polyline 
              positions={track.map(coord => [coord.lat, coord.lon])} 
              color="blue" 
              weight={3} // Tebal polyline
            />
          )}

          {/* Render markers - Pastikan berada di atas polyline */}
          {coordinates.map((coord, index) => (
            <Marker 
              key={index} 
              position={[coord.lat, coord.lon]} 
              icon={customIcon} 
              riseOnHover={true} // Membuat marker tetap terlihat di atas polyline saat di-hover
            >
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

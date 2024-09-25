import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Footer from "./footer";
import MonitoringCam from "./monitoring";
import { ref, onValue, query, limitToLast } from "firebase/database"; // Pastikan method yang tepat di-import
import { db } from "../lib/firestore";

const Circular = () => {
  const [sensorData, setSensorData] = useState(null); // State untuk menyimpan data terbaru

  useEffect(() => {
    const sensorDataRef = query(ref(db, '/sensorData'), limitToLast(1)); // Query untuk mengambil data terbaru saja

    onValue(sensorDataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const latestData = Object.values(data)[0]; // Mengambil data terbaru dari object
        setSensorData(latestData);
        console.log("Latest Sensor Data: ", latestData); // Log data terbaru ke console
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center md:gap-8 ">
        <MonitoringCam />
        <div className="flex flex-col items-center md:gap-8">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-center text-lg">
              <h1 className="font-semibold mb-2">Longitude</h1>
              <div className="border border-gray-500 rounded-3xl p-2">
                {sensorData ? sensorData.longitude : "Loading..."}
              </div>
            </div>
            <div className="flex flex-col items-center text-lg">
              <h1 className="font-semibold mb-2">Latitude</h1>
              <div className="border border-gray-500 rounded-3xl p-2">
                {sensorData ? sensorData.latitude : "Loading..."}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-12 text-lg">
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Azimuth</p>
              <div className="border border-gray-500 w-16 h-16 rounded-full flex items-center justify-center">
                {sensorData ? `${sensorData.azimuth}°` : "Loading..."}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Speed</p>
              <div className="border border-gray-500 w-16 h-16 rounded-full flex items-center justify-center">
                {sensorData ? `${sensorData.speed_ms} m/s` : "Loading..."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Circular;

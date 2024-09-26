import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Footer from "./footer";
import MonitoringCam from "./monitoring";
import { ref, onValue, query, limitToLast } from "firebase/database"; // Pastikan method yang tepat di-import
import { db } from "../lib/firestore";

const Circular = () => {
  const [sensorData, setSensorData] = useState(null); // State untuk menyimpan data terbaru

  useEffect(() => {
    const fetchData = async () => {
      const sensorDataRef = query(ref(db, '/sensorData'), limitToLast(1)); // Query untuk mengambil data terbaru saja

      // Membuat Promise untuk membungkus logika onValue
      const dataPromise = new Promise((resolve, reject) => {
        onValue(sensorDataRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const latestData = Object.values(data)[0]; // Mengambil data terbaru dari object
            resolve(latestData);
          } else {
            reject("No data available");
          }
        }, (error) => {
          reject(error);
        });
      });

      try {
        const latestData = await dataPromise; // Tunggu data dari Firebase
        setSensorData(latestData);
        console.log("Latest Sensor Data: ", latestData); // Log data terbaru ke console
      } catch (error) {
        console.error(error); // Handle error jika terjadi
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen di-mount
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center md:gap-8 md:my-16 my-4">
        <MonitoringCam />
        <div className="flex flex-col items-center md:gap-8">
          <h1>
            Latest data: {sensorData ? sensorData.timestamp : "Loading..."}
          </h1>
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
          <div className="flex flex-row gap-x-12 md:text-lg text-base">
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Azimuth</p>
              <div className="border border-gray-500 md:text-lg text-sm md:w-20 md:h-20 w-16 h-16 rounded-full flex items-center justify-center">
                {sensorData ? `${sensorData.azimuth}°` : "Loading..."}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Speed</p>
              <div className="border border-gray-500 md:text-lg text-sm md:w-20 md:h-20 w-16 h-16 rounded-full flex items-center justify-center">
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

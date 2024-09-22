import React from "react";
import "react-circular-progressbar/dist/styles.css";
import Footer from "./footer";
import MonitoringCam from "./monitoring";

const Circular = () => {

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center md:gap-8 ">
        <MonitoringCam />
        <div className="flex flex-col items-center md:gap-8">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-center text-lg">
              <h1 className="font-semibold mb-2">Longitude</h1>
              <div className="border border-gray-500 rounded-3xl p-2">
                7.2282828
              </div>
            </div>
            <div className="flex flex-col items-center text-lg">
              <h1 className="font-semibold mb-2">Latitude</h1>
              <div className="border border-gray-500 rounded-3xl p-2">
                7.2282828
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-12 text-lg">
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Battery</p>
              <div className="border border-gray-500 w-16 h-16 rounded-full flex items-center justify-center">
                40%
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Degree</p>
              <div className="border border-gray-500 w-16 h-16 rounded-full flex items-center justify-center">
                142°
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold">Speed</p>
              <div className="border border-gray-500 w-16 h-16 rounded-full flex items-center justify-center">
                40m/s
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

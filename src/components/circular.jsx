import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circular = () => {
  const speed = 40; // nilai speed dalam persentase

  return (
    <>
      <div className="flex flex-row justify-center gap-8">
        <div>
          <div className="sm:w-[35vw] h-[35vh] bg-blue-400 flex items-center justify-center rounded-lg">
            maybe video or image
          </div>
          <div className="flex justify-evenly py-4">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Longitude</p>
              <div className="bg-blue-400 w-24 h-10 rounded-xl flex items-center justify-center">
                110.461959
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Latitude</p>
              <div className="bg-blue-400 w-24 h-10 rounded-xl flex items-center justify-center">
                -7.044723
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <p className="font-semibold">Battery</p>
            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
              40%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Degree</p>
            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
              142°
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Speed</p>
            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
              40m/s
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Circular;

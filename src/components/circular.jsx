import React from "react";

const Circular = () => {
  return (
    <>
      <div className="flex flex-row px-4">
      <div>
    <canvas id="speedChart" width="400" height="200"></canvas>
        </div>
        <div className="w-[35vw] h-[35vh] bg-blue-400 flex items-center justify-center">
          maybe video or image
        </div>
        <div className="grid grid-cols-2 grid-rows-2 w-1/3">
          <div className="flex flex-col items-center">
            <p>Battery</p>
            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
              40%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>Speed</p>
            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
              40m/s
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>Longtitude</p>
            <div className="bg-blue-400 w-24 h-10 rounded-full flex items-center justify-center">
              110.461959
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>Latitude</p>
            <div className="bg-blue-400 w-24 h-10 rounded-full flex items-center justify-center">
              -7.044723
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Circular;

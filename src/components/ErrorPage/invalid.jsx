import React from "react";
import { Link } from "react-router-dom";

export default function Invalidsearch() {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-[91vh]">
      <img
        src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
        className="absolute h-full w-full object-cover"
        alt="Url Invalid"
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-20 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h1 className="font-extrabold text-2xl md:text-5xl text-center text-white leading-tight mt-4">
            Server Error
          </h1>
          <p className="font-extrabold text-8xl mt-44 text-white animate-bounce">
            500
          </p>
          <Link to="/">
            <div className="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
              Got to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

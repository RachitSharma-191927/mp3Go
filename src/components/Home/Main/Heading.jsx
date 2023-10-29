import React from "react";

export default function Heading() {
  return (
    <>
      <div className="flex justify-center items-center leading-relaxed my-[30px]">
        <h1 className="mb-4 text-xl text-center font-extrabold leading-normal tracking-wide text-gray-900 md:text-4xl md:leading-normal lg:text-5xl lg:leading-relaxed dark:text-white">
          "Discover the Rhythm, Explore the Melody
          <br />
          <span className="text-blue-600 dark:text-blue-500">
            {" "}
            Mp3 Go{" "}
          </span>{" "}
          Your Gateway to Musical Masterpieces!"
        </h1>
      </div>
    </>
  );
}

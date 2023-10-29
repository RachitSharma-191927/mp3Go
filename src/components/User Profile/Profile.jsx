import React from "react";

export default function Profile({ data }) {
  return (
    <div className="w-full bg-gray-900 bg-opacity-10 dark:bg-[#303134] max-h-[100vh]">
      <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
        <div>
          <p className="text-4xl font-black leading-9 text-center">Profile</p>
          <img
            src={data.img}
            alt="User_Image"
            className="rounded-full w-32 h-32 m-auto mt-10"
          />
          <div className="flex items-center pt-10">
            {/* <p className="text-base leading-none ">Name:&nbsp;</p> */}
            <p className="text-base leading-none font-bold">{data.name}</p>
          </div>
          <div className="flex items-center pt-5">
            {/* <p className="text-base leading-none ">Email:&nbsp;</p> */}
            <p className="text-base leading-none font-bold">{data.email}</p>
          </div>
          <div className="flex items-center pt-5 font-bold">
            {/* <p className="text-base leading-none ">Gender:&nbsp;</p> */}
            <p className="text-base leading-none ">{data.gender}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center pb-6 justify-between lg:pt-5 pt-2">
            <p className="text-xl sm:text-2xl leading-normal font-bold">
              Total Orders:{" "}
            </p>
            <p className="text-2xl font-bold leading-normal text-right ">
              {data.orders.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

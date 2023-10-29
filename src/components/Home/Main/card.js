import React from "react";
import { Ripple, initTE } from "tw-elements";
import { Link } from "react-router-dom";

initTE({ Ripple });

export default function Card({ id, image, title, price }) {
  return (
    <div className="py-10">
      {/* <div className="rounded overflow-hidden shadow-lg max-w-sm hover:scale-110 w-60">
      <img className="w-full h-44 sm:h-48" src={image} alt="card" />
      <div className="px-6 py-4 h-32">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="hover:overflow-scroll scrollbar-hide overscroll-none text-gray-700 text-base h-24">{description}</p>
      </div>
      <div>
        
      </div>
    </div> */}
      <div className="wrapper antialiased text-gray-900 hover:translate-y-1">
        <div>
          <Link to={`/music/${id}`}>
            <img
              src={image}
              alt="random imgee"
              className="w-full object-center rounded-2xl shadow-md h-60"
            />
          </Link>

          <div className="relative px-4 -mt-10">
            <div className="bg-[#EAEFF2] p-5 rounded-2xl shadow-lg dark:bg-black dark:text-white">
              <h4 className="mt-1 text-lg font-medium uppercase leading-tight truncate">
                {title}
              </h4>
              <div className="mt-1">Rs {price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

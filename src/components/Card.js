import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Ripple, initTE } from "tw-elements";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";

initTE({ Ripple });

export default function Card({ image, title, price, id, artist }) {
  let location = useLocation();
  const isWishlistPage = location.pathname === "/wishlist";
  const { addToWishlist } = useWishlist();
  const { addtoCart } = useCart();

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-80 md:h-96 max-w-sm transition ease-in-out delay-150 hover:scale-105 duration-300 dark:bg-black bg-white">
      <Link to={`/music/${id}`}>
        <img className="w-full h-44 p-3" src={image} alt="card" />{" "}
      </Link>
      <div className="px-6 lg:py-4 h-32 mt-2">
        <div className="truncate font-bold">{title}</div>
        <p className="truncate text-sm text-gray-400 mb-2">
          by {artist ? artist.join(", ") : null}
        </p>
        <div className="font-bold text-xl mb-2">Rs {price}</div>
        <div className="flex justify-between">
          {!isWishlistPage && (
            <button
              onClick={() => addToWishlist(id, "add")}
              className="text-white rounded-md md:text-[1rem] lg:text-[1rem]  text-[.8rem] border-0 outline-0 w-full py-[0.4rem] md:py-[0.8rem] m-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black dark:bg-[#20212499]">
              Wishlist
            </button>
          )}
          {isWishlistPage && (
            <button
              onClick={() => addToWishlist(id, "rem")}
              className="text-white rounded-md md:text-[1rem] lg:text-[1rem]  text-[.8rem] border-0 outline-0 w-full py-[0.4rem] md:py-[0.8rem] m-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black dark:bg-[#20212499]">
              Remove
            </button>
          )}
          <button
            className="text-white rounded-md md:text-[0.9rem] lg:text-[1rem] text-[.8rem] border-0 outline-0 w-full py-[0.4rem] md:py-[0.8rem] m-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black  dark:bg-[#20212499]"
            onClick={() => addtoCart(id, "add")}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Ripple, initTE } from "tw-elements";
import { BsHeartFill, BsCartFill } from "react-icons/bs";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

initTE({ Ripple });

export default function Card({ image, title, price, id, artist }) {
  let location = useLocation();
  const isWishlistPage = location.pathname === "/wishlist";
  const { addToWishlist } = useWishlist();
  const { addtoCart } = useCart();

  const handleAddToWishlist = () => {
    addToWishlist(id, "add");
  };

  const handleAddToCart = () => {
    addtoCart(id, "add");
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg md:h-[450px] w-[90%] transition ease-in-out delay-150 hover:scale-105 duration-300 dark:bg-black bg-white flex flex-col">
      <Link to={`/music/${id}`}>
        <img
          className="w-[100%] h-44  md:h-56 p-3 object-center m-0"
          src={image}
          alt="card"
        />{" "}
      </Link>
      <div className="px-6 lg:py-4 mt-2 flex flex-col grow">
        <div className="flex-1 flex flex-col justify-center">
          <div className="truncate font-bold">{title}</div>
          <p className="truncate text-sm text-gray-400 mb-2">
            {artist.map((ele) => {
              return `${ele} `;
            })}
          </p>
          <div className="font-bold text-xl mb-2">Rs {price}</div>
        </div>

        <div className="flex-1 flex flex-col grow justify-end mb-4">
          {!isWishlistPage && (
            <button
              className="flex flex-row  justify-center items-center text-white rounded-md md:text-[1rem] lg:text-[1rem] text-[.8rem] border-0 outline-0 w-full py-[0.2rem] md:py-[0.4rem] mt-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black dark:bg-[#20212499]"
              onClick={handleAddToWishlist}>
              Wishlist&nbsp; <BsHeartFill />
            </button>
          )}
          <button
            className="flex flex-row  justify-center items-center text-white rounded-md md:text-[0.9rem] lg:text-[1rem] text-[.8rem] border-0 outline-0 w-full py-[0.2rem] md:py-[0.4rem] mt-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black  dark:bg-[#20212499]
          "
            onClick={handleAddToCart}>
            Add to Cart&nbsp; <BsCartFill />
          </button>
        </div>
      </div>
    </div>
  );
}

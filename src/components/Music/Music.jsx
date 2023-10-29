import React from "react";
import { useParams } from "react-router-dom";
import { BsHeartFill, BsCartFill } from "react-icons/bs";
import { useAxios } from "../../hooks/useAxios";
import FeaturedAlbums from "../Home/Main/FeaturedAlbums";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

export default function Music() {
  const { id } = useParams();
  const { data, error } = useAxios(`/albums/${id}`, "GET");
  const { addToWishlist } = useWishlist();
  const { addtoCart } = useCart();

  return (
    <>
      {error ? <div>{error.response.data}</div> : null}
      <div className="pt-5 h-full flex flex-col md:flex-col  w-full px-5 md:px-[50px]">
        <div className="flex flex-col md:flex-row h-full m-0">
          <div className="md:w-1/3 flex justify-center items-center p-2">
            <img
              className="w-[90%] h-[90%] sm:w-[70%] sm:max-w-[400px] sm:max-h-[400px] sm:h-[70%] md:w-[80%] md:h-[80%] align mx-5 shadow-xl rounded-md"
              src={data ? data.img : null}
              alt="Music"></img>
          </div>
          <div className="w-full md:w-2/3 h-[90%] p-1 md:p-4 flex flex-1 flex-col">
            <div className="text-3xl sm:text-6xl text-center font-black m-5 leading-none">
              {data ? data.name : null}
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-sans">
              <span className="font-bold">Genre: </span>{" "}
              {data ? data.language : null}
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-sans">
              <span className="font-bold">Artist: </span>
              {data
                ? data.artist.map((d, index) => {
                    if (index === data.artist.length - 1) return `${d}`;
                    return `${d}, `;
                  })
                : null}
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-sans">
              <span className="font-bold">Price: </span>
              Rs {data ? data.price : null}
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-sans">
              <span className="font-bold">Year of Release: </span>
              {data ? data.year : null}
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-sans">
              <span className="font-bold">Duration: </span>
              {data ? data.duration : null}
              <span> minutes</span>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex flex-col md:flex-row mt-3 md:mt-5 justify-between justify-self-end">
                <button
                  onClick={() => addToWishlist(id, "add")}
                  className="flex-1 flex justify-center items-center rounded-lg text-white md:text-[1rem] lg:text-[1rem]  text-[.8rem] border-0 outline-0 w-full p-[.8rem] md:p-[1rem] mb-2 md:m-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black">
                  <div className="px-2">Wishlist</div>
                  <div>
                    <BsHeartFill />
                  </div>
                </button>
                <button
                  onClick={() => addtoCart(id, "add")}
                  className="flex-1 flex justify-center items-center rounded-lg text-white md:text-[0.9rem] lg:text-[1rem] text-[.8rem] border-0 outline-0 w-full p-[0.8rem] md:p-[1rem] mb-2 md:m-1 transition ease-in-out delay-150 hover:scale-y-110 duration-300 bg-black">
                  <div className="px-2">Add to Cart</div>
                  <div>
                    <BsCartFill />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-2 sm:px-5">
          <div className="p-2 text-3xl sm:text-6xl font-bold">Lyrics</div>
          <div className="p-5 bg-black mt-3 sm:mt-5 mx-3 sm:mx-1 max-h-72 sm:max-h-64 h-full overflow-auto rounded-lg text-lg text-white text-center font-serif">
            " {data ? data.lyric : null} "
          </div>
        </div>

        <div className="flex flex-col">
          <div className="p-5 w-[100%] h-full ">
            <FeaturedAlbums />
          </div>
        </div>
      </div>
    </>
  );
}

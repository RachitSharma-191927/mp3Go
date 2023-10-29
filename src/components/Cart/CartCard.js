import React from "react";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

//Todo: Counter function for a particular cartID and not all
export default function CartCard({ data }) {
  const { addToWishlist } = useWishlist();
  const { addtoCart } = useCart();

  return (
    <div>
      <div className="md:flex items-center mt-2 py-8 border-t border-gray-400 dark:border-[#3c4043]">
        <div className="lg:w-2/5 xl:p-3 sm:w-2/5 w-3/5 items-center sm:items-center">
          <img
            src={data.product.img}
            alt="Product Image"
            className="w-full rounded-sm lg:pl-3 h-40 object-center object-cover"
          />
        </div>
        <div className="md:pl-3 md:w-3/4">
          <p className="text-xs leading-3  md:pt-0 pt-4">{data.product.name}</p>
          <div className="flex items-center justify-between w-full pt-1">
            <p className="font-black leading-none text-5xl">
              {data.product._name}
            </p>
            <div className="flex justify-center w-1/5">
              <svg
                className="fill-current w-3"
                viewBox="0 0 448 512"
                onClick={() => addtoCart(data.product._id, "dqty")}>
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>

              <input
                className="mx-2 bg-[#DEE4E799] dark:bg-[#303134]  text-black dark:text-white text-center w-8 focus:outline-none dark:font-medium"
                type="text"
                value={data.qty}
              />

              <svg
                className="fill-current w-3"
                viewBox="0 0 448 512"
                onClick={() => addtoCart(data.product._id, "iqty")}>
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
          </div>
          <p className="text-xs leading-3  pt-2">
            Language: {data.product.language}
          </p>
          <p className="text-xs leading-3  py-4">
            Artist: {data.product.artist}
          </p>
          <div className="flex items-center justify-between pt-5 pr-6">
            <div className="flex itemms-center">
              <p
                onClick={() => addToWishlist(data.product._id, "add")}
                className="text-xs font-medium leading-3  cursor-pointer">
                Add to Wishlist
              </p>
              <p
                onClick={() => addtoCart(data.product._id, "rem")}
                className="text-xs leading-3 font-medium text-red-500 pl-5 cursor-pointer">
                Remove
              </p>
            </div>
            <p className="text-base font-black leading-none ">
              {data.product.price * data.qty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

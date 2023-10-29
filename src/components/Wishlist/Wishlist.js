import React from "react";
import AlbumList from "../AlbumList";
import { useAxios } from "../../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItems } from "../../redux/userWishlit";
import { useEffect } from "react";

export default function Wishlist() {
  var { data: value, error } = useAxios("/user/wishlist", "GET");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!error) {
      dispatch(addWishlistItems(value));
    }
  }, [value, error, dispatch]);

  const data = useSelector((state) => state.userWishlist.userWishlist);
  return (
    <div className="pt-10 pb-10 bg-[#DEE4E799] dark:bg-[#202124] min-h-[100vh] px-10">
      <p className="ml-1 text-2xl font-bold leading-none">My Wishlist</p>
      {error
        ? error.response.status == 409
          ? "Please Add Items to your Wishlist First"
          : null
        : null}
      {data ? (
        data.length > 0 ? (
          <AlbumList
            albums={data.map((data) => {
              return data.product;
            })}
          />
        ) : null
      ) : null}
    </div>
  );
}

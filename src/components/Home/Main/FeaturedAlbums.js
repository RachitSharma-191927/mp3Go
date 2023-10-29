import React from "react";
import { Link } from "react-router-dom";
import { Ripple, initTE } from "tw-elements";
import Card from "./card";
import { useAxios } from "../../../hooks/useAxios";

initTE({ Ripple });

export default function FeaturedAlbums() {
  const { data, error } = useAxios("/albums/featured-albums", "GET");

  return (
    <div className="mx-4 mt-4 py-2 px-5">
      <h1 className="mt-10 mb-2 text-center font-sans capitalize text-5xl font-medium">
        Featured Albums
      </h1>
      <hr className="w-[25%] mx-auto" />
      {/* <AlbumList albums={featuredAlbums} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center mt-5">
        {data
          ? data.map((album) => (
              <Card
                id={album._id}
                image={album.img}
                price={album.price}
                title={album.name}
              />
            ))
          : null}
      </div>
      <div className="mt-[5rem] flex justify-center ">
        <Link to="/albums">
          <button className="text-center text-white rounded-md px-[2rem] py-4 hover:text-gray cursor-pointer bg-black">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
}

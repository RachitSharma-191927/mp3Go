import React from "react";
import Card from "./card";

import { Ripple, initTE } from "tw-elements";

import { useAxios } from "../../../hooks/useAxios";

initTE({ Ripple });

export default function NewReleases() {
  const { data, error } = useAxios("/albums/new-releases", "GET");

  return (
    <div className="mx-4 my-4 py-2 px-5">
      <h1 className="mt-10 mb-2 text-center font-sans capitalize text-5xl font-medium">
        New Releases
      </h1>
      <hr className="w-1/5 mx-auto " />
      {/* <AlbumList albums={newReleases} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 justify-center mt-5">
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
    </div>
  );
}

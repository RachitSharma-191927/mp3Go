import React from "react";
import Card from "./Card";

export default function AlbumList({ albums }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 justify-center mt-5">
        {albums.map((album) => (
          <Card
            key={album._id}
            id={album._id}
            image={album.img}
            price={album.price}
            title={album.name}
            artist={album.artist}
          />
        ))}
      </div>
    </div>
  );
}

import { useAxios } from "../../hooks/useAxios";
import AlbumList from "../AlbumList";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
// error page for any random string for genretype
// error status from backend?

export default function Language() {
  const { language } = useParams();
  let [albums, setAlbums] = useState([]);
  const { data, error } = useAxios(`/albums/language/${language}`, "GET");

  useEffect(() => {
    if (data) {
      let sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setAlbums(sortedData);
    }
  }, [data]);

  return (
    <div className="pt-10 pb-10 bg-[#DEE4E799] dark:bg-[#202124] min-h-[100vh] px-10">
      {error ? <div>{error.response.data}</div> : null}
      <>
        <h2 className="ml-3 text-3xl sm:text-6xl font-bold leading-none text-center">
          {language.toUpperCase()}
        </h2>
        {albums ? <AlbumList albums={albums} /> : null}
      </>
    </div>
  );
}

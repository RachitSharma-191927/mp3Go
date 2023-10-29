import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import Carousel from "./Carousel";
import { useAxios } from "../../../hooks/useAxios";

export default function Carouselcomp() {
  const { data, error } = useAxios("/albums/data/filter", "GET");
  // console.log(data[0]);

  return (
    <div className="">
      {data ? (
        <Carousel
          cards={data[0].languages.slice(0, 6).map((item) => {
            return {
              key: uuidv4(),
              content: <Card imagen={item.img} music={item.name} />,
            };
          })}
          height="350px"
          width="60%"
          margin="0 auto"
          offset={200}
          showArrows={false}
        />
      ) : null}
    </div>
  );
}

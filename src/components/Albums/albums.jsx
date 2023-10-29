import React, { useState, useEffect } from "react";
import Card from "./card";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactSlider from "react-slider";
import { useAxios } from "../../hooks/useAxios";

const animatedComponents = makeAnimated();

export default function Allalbums() {
  const [category, setCategory] = useState([]);
  const [artist, setArtist] = useState([]);
  const [range, setRange] = useState({ min: 100, max: 999 });
  const { data: filterdata, error } = useAxios("/albums/data/filter", "GET");
  const { data, error: error2 } = useAxios("/albums/all", "GET");
  const [dataa, setData] = useState(data ? data : null);
  useEffect(() => {
    if (category.length && artist.length) {
      let result = data
        ? data.filter((ele) => {
            if (
              category.includes(ele.language) &&
              artist.includes(...ele.artist) &&
              range.min <= ele.price &&
              ele.price <= range.max
            ) {
              return true;
            }
            return false;
          })
        : null;
      setData(result);
    } else if (category.length) {
      let result = data
        ? data.filter((ele) => {
            if (
              category.includes(ele.language) &&
              range.min <= ele.price &&
              ele.price <= range.max
            ) {
              return true;
            }
            return false;
          })
        : null;
      setData(result);
    } else if (artist.length) {
      let result = data
        ? data.filter((ele) => {
            if (
              artist.includes(...ele.artist) &&
              range.min <= ele.price &&
              ele.price <= range.max
            ) {
              return true;
            }
            return false;
          })
        : null;
      setData(result);
    } else {
      let result = data
        ? data.filter((ele) => {
            if (range.min <= ele.price && ele.price <= range.max) {
              return true;
            }
            return false;
          })
        : null;
      setData(result);
    }
  }, [category, artist, range, data]);

  function handleCategoryChange(event) {
    let category = [];
    event.forEach((item) => {
      category.push(item.value);
    });
    setCategory(category);
  }

  function handleArtistChange(event) {
    let artist = [];
    event.forEach((item) => {
      artist.push(item.value);
    });
    setArtist(artist);
  }

  function handlemin(data) {
    setRange({ min: data[0], max: data[1] });
  }
  return (
    <div className="grid grid-cols-5 gap-2 mt-0 pt-5 min-h-[100vh]">
      <div className="col-span-2 md:col-span-1 p-2">
        <h3 className="font-bold text-center leading-9">Apply Filters</h3>
        <div className="p-1">
          <div>
            <h4 className="font-bold my-5+">Select Language</h4>
            <Select
              onChange={handleCategoryChange}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={
                filterdata
                  ? filterdata[0].languages.map((item) => {
                      return {
                        value: item.name,
                        label: item.name,
                      };
                    })
                  : null
              }
              className="text-black z-50"
            />
          </div>
          <div>
            <h4 className="font-bold my-3">Select Artist</h4>
            <Select
              onChange={handleArtistChange}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={
                filterdata
                  ? filterdata[0].artists.map((ele) => {
                      return {
                        value: ele,
                        label: ele,
                      };
                    })
                  : null
              }
              className="text-black z-40"
            />
          </div>
          <div>
            <h4 className="font-bold my-3">Select Price Range</h4>
            <div>
              Rs<span>{range.min}</span>&nbsp;-&nbsp;Rs
              <span>{range.max}</span>
            </div>
            <ReactSlider
              className="bg-black mt-3 w-5/6 z-30"
              thumbClassName="bg-black text-white rounded-full p-1"
              trackClassName="example-track"
              min={100}
              max={999}
              defaultValue={[100, 999]}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              pearling
              minDistance={10}
              onAfterChange={handlemin}
            />
          </div>
        </div>
      </div>
      <div className="md:col-span-4 col-span-3 min-h-[80vh] justify-center mb-[100px]">
        <p className="text-xl sm:text-3xl md:text-5xl   lg:text-6xl text-center font-black leading-9 m-5">
          Album Collections
        </p>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2 pt-5 h-full container">
          {dataa
            ? dataa.map((card) => (
                <Card
                  image={card.img}
                  title={card.name}
                  price={card.price}
                  artist={card.artist}
                  id={card._id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const SearchInput = (searchValue) => {
  const divRef = useRef(null);
  const [FilterData, setFilterData] = useState([]);
  const [isVisible, setIsVisible] = useState([false]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setFilterData([]);
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function DataChange(searchValue) {
    if (searchValue.target.value === "") {
      setFilterData([]);
      setIsVisible(false);
    }
    const data = await axios.get("https://mp3backend.onrender.com/albums/all");
    const value = data.data.filter((a) => {
      if (
        a.name.toUpperCase().includes(searchValue.target.value.toUpperCase())
      ) {
        return true;
      }
      return false;
    });
    setIsVisible(true);
    if (value.length > 3) {
      setFilterData(value.slice(0, 3));
    } else {
      setFilterData(value);
    }
  }

  function focusout() {
    setIsVisible(false);
    setFilterData([]);
  }

  return (
    <div className="md:flex md:flex-center flex-col z-60">
      <div className="relative cursor-text flex w-full ">
        <span className="absolute inset-y-0 flex items-center left-2 pr-0 md:pr-2 lg:pr-0">
          <FontAwesomeIcon className="text-slate-400 h-5" icon={faSearch} />
        </span>
        <input
          onChange={(e) => {
            DataChange(e);
          }}
          className="py-3 lg:px-10 px-10 md:px-7 
        rounded-sm 
        bg-slate-200
        focus:outline-none
        dark:bg-slate-700 
        dark:text-slate-300"
          type="text"
          placeholder="Search for songs"
        />
        {isVisible ? (
          <div
            className="flex-1 rounded-md mt-1 w-full flex flex-col justify-center absolute top-full bg-slate-50
        dark:bg-slate-700"
            onBlur={focusout}
            ref={divRef}
            tabIndex={1}>
            {FilterData
              ? FilterData.map((data) => {
                  return (
                    <Link to={`/music/${data._id}`} onClick={focusout}>
                      <div className="h-14 mt-0 m-1 z-60 flex items-center bg-white text-black rounded-md">
                        <img
                          className="w-[3.5rem] h-[3.5rem] rounded-md p-1"
                          src={data.img}
                          alt="demo"
                        />
                        <div>{data.name.split(" ").splice(0, 2).join(" ")}</div>
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        ) : null}

        <style jsx>{`
        @media (max-width: 640px) {
          input {
            width: 62%;
          }
        }
          @media (max-width: 388px) {
            input {
              width: 100%;
            }
          }
          @media (max-width: 640px) {
            .absolute {
              left: 1rem;
            }
            
            .pl-2 {
              padding-left: 0.5rem;
            }
            }
          
        }
      `}</style>
      </div>
    </div>
  );
};

export default SearchInput;

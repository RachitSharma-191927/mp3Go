import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

function Card({ imagen, music }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    opacity: 1,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });
  return (
    <animated.div
      className="flex flex-col justify-center w-[12rem] sm:w-[20rem] h-[70%] sm:h-[100%] rounded-[10px] object-none"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}>
      <div
        className="md:w-full sm:w-75% w-25% h-full flex flex-col justify-end"
        style={{
          backgroundImage: `url(${imagen})`,
          backgroundSize: "100% 100%",
        }}>
        {/* <img src={imagen} className="w-full h-[100px] rounded-[20px]" alt="" /> */}
        {/* <div className="p-2 font-bold">{music}</div> */}

        <Link to={`/language/` + music}>
          <div className="flex justify-center align-center">
            <button className=" text-white md:text-[1rem] font-serif tracking-wide lg:text-[1rem] border-0 outline-0 w-full py-[1rem] px-0 m-0 transition ease-in-out delay-150 hover:scale-y-110 font-semibold scale-[101%] duration-300 bg-gradient-to-b from-slate-900 to-black">
              {music} Music
            </button>
          </div>
        </Link>
      </div>
    </animated.div>
  );
}

export default Card;

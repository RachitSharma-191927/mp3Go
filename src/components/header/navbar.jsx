import React from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import SearchInput from "./search/SearchInput";
import Dropdown from "./dropit";
import ToggleButton from "../toggle-button/togglebutton";
import { BsHeart, BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItems, removeWishlistItems } from "../../redux/userWishlit";
import { addCartItems, removeCartItems } from "../../redux/usercart";
import { removeToken } from "../../redux/token";
import ProfileIcon from "./ProfileIcon";
import { useNavigate } from "react-router-dom";
export default function Navbarnew() {
  const tokenValue = useSelector((state) => state.tokenData.token);
  const { data: value, error } = useAxios("/user/cart", "GET");
  const { data: value2, error: error2 } = useAxios("/user/wishlist", "GET");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(removeToken());
    dispatch(removeCartItems());
    dispatch(removeWishlistItems());
    navigate("/");
  }

  useEffect(() => {
    if (error || error2) {
      return;
    }
    dispatch(addWishlistItems(value2));
    dispatch(addCartItems(value));
  }, [value, value2, error, error2, dispatch]);

  const wishlist = useSelector((state) => state.userWishlist.userWishlist);
  const userCart = useSelector((state) => state.userCart.userCart);

  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full bg-white dark:bg-black text-black dark:text-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4">
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-between py-3 md:py-5 md:block">
            <div className="h-full flex items-center">
              <div className="flex-1 flex items-center flex-start p-1 h-8 ">
                <Link to="/" className="flex items-center">
                  <img
                    src="https://res.cloudinary.com/dhjriczfe/image/upload/v1686769665/flc_design20230614159558_2_gbep6x.png"
                    className="h-12 w-8 md:w-5 lg:w-8"
                    alt="Flowbite Logo"
                  />
                  <div className="text-xl md:text-lg lg:text-xl font-bold pl-1">
                    Mp3Go
                  </div>
                </Link>
                <ul className="items-center justify-center hidden md:flex md:space-x-6 md:space-y-0 ml-5">
                  <Link to="/">
                    <li className="font-semibold hover:text-gray py-1">Home</li>
                  </Link>
                  <Link to="/albums">
                    <li className="font-semibold hover:text-gray py-1">
                      Album
                    </li>
                  </Link>
                  <li className=" hover:text-gray py-1 mt-0">
                    <Dropdown />
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <Link to="/wishlist" className="pl-2">
                <div className="flex flex-row">
                  <BsHeart />
                  <sup className="dark:bg-white bg-black text-white dark:text-black text-xs px-1 relative right-1 rounded-full">
                    {wishlist ? (wishlist.length > 0 ? wishlist.length : 0) : 0}
                  </sup>
                </div>
              </Link>

              <Link to="/cart" className="pl-2">
                <div className="flex flex-row">
                  <BsCartFill />
                  <sup className="dark:bg-white bg-black text-white dark:text-black text-xs px-1 relative right-1 rounded-full">
                    {userCart
                      ? Object.keys(userCart).length
                        ? userCart.items.length
                        : 0
                      : 0}
                  </sup>
                </div>
              </Link>
              {/* <ProfileIcon image={tokenValue ? "" : ""} /> */}
              <ToggleButton />
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-start">
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}>
            <ul className="items-center flex-start lg:flex">
              <li className="hover:text-gray py-1">
                <SearchInput />
              </li>
              {/* <Link to="/">
                <li className="font-semibold hover:text-gray py-1">Home</li>
              </Link>
              <Link to="/albums">
                <li className="font-semibold hover:text-gray py-1">Album</li>
              </Link> */}
              {/* <li className=" hover:text-gray py-1 mt-0">
                <Dropdown />
              </li> */}
              <div className="space-y-2 inline-block md:hidden">
                {tokenValue ? (
                  <>
                    <Link to="/Profile">
                      <li className="font-semibold hover:text-gray py-1">
                        Profile
                      </li>
                    </Link>

                    <div onClick={logoutUser}>
                      <li className="font-semibold hover:text-gray py-1">
                        Logout
                      </li>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <li className="font-semibold hover:text-gray py-1">
                        Log In
                      </li>
                    </Link>

                    <Link to="/signup">
                      <li className="font-semibold hover:text-gray py-1">
                        Sign Up
                      </li>
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <div className="flex flex-end w-full items-center">
            <Link to="/wishlist" className="pl-2">
              <div className="flex flex-row">
                <BsHeart />
                <sup className="dark:bg-white bg-black text-white dark:text-black text-xs px-1 relative right-1 rounded-full">
                  {wishlist ? (wishlist.length > 0 ? wishlist.length : 0) : 0}
                </sup>
              </div>
            </Link>

            <Link to="/cart" className="pl-2">
              <div className="flex flex-row">
                <BsCartFill />
                <sup className="dark:bg-white bg-black text-white dark:text-black text-xs px-1 relative right-1 rounded-full">
                  {userCart
                    ? Object.keys(userCart).length
                      ? userCart.items.length
                      : 0
                    : 0}
                </sup>
              </div>
            </Link>
            <ProfileIcon image={tokenValue ? "" : ""} />
            <div className="pl-3">
              <ToggleButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../redux/token";
import { removeCartItems } from "../../redux/usercart";
import { removeWishlistItems } from "../../redux/userWishlit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileIcon({ image }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(removeToken());
    dispatch(removeCartItems());
    dispatch(removeWishlistItems());
    navigate("/");
  }
  const token = useSelector((state) => state.tokenData.token);
  return (
    <Menu as="div" className="relative inline-block text-left ml-3">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {image ? (
            image
          ) : (
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
              }
              alt="User_image"
              className="w-5 h-5"
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {token ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/Profile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={logoutUser}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Log In
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/signup"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}>
                      Sign Up
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

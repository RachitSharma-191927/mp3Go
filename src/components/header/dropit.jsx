import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
  const { data } = useAxios("/albums/data/filter", "GET");

  return (
    <Menu as="div" className="relative inline-block text-left mt-0">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  font-semibold">
          Language
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 left-2 z-10 mt-2 w-32 md:w-56 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {data
              ? data[0].languages.map((item) => (
                  <Menu.Item>
                    {({ active }) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <Link
                        to={`/language/` + item.name}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}>
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))
              : null}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

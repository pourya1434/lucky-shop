import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {userInfo} = useSelector(state => state.user.userAuth)

  return (
    <div className="flex w-full h-14 items-center justify-between p-6 bg-black text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold font-handwrite">Lucky.</h1>
      </Link>
      {/* responsive search box */}
      <div className="flex w-full mx-auto justify-center">
        <input
          type="text"
          className="hidden md:block border-2 w-full mx-5 max-w-lg rounded-lg p-2 text-gray-700 font-semibold placeholder-gray-500 focus:outline-none"
          placeholder="Search ..."
          id="link-input"
        ></input>
      </div>
      {/* menu items */}
      <ul className="flex space-x-4 items-center font-semibold">
        <li className="inline-flex w-full justify-center gap-x-1.5">
          <Link
            to="/cart"
            className="inline-flex w-full justify-center gap-x-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span>Cart</span>
            <span>{cartItems.length}</span>
          </Link>
        </li>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full font-bold justify-center gap-x-1.5 rounded-md px-3 py-2 text-white">
              Account
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/signup/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      signup
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </ul>
    </div>
  );
}

export default Header;




import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Steps from "../components/steps";
import { saveShippingAddress } from "../redux/slice/cart/cartSlice";

function ShippingScreen() {
  // status => upcoming, current, complete
  const steps = [
    {
      name: "Login",
      description: "Login to your account",
      href: "/login/",
      status: "complete",
    },
    {
      name: "Shipping",
      description: "Insert your address",
      href: "/shipping/",
      status: "current",
    },
    {
      name: "Payment",
      description: "Buy it",
      href: "/checkout/",
      status: "upcoming",
    },
    {
      name: "Place order",
      description: "order",
      href: "#",
      status: "upcoming",
    },
  ];
  const { shippingAddress } = useSelector((state) => state.cart);

  const [formData, SetFormData] = useState({
    name: shippingAddress.name,
    city: shippingAddress.city,
    street: shippingAddress.street,
    postalCode: shippingAddress.postalCode,
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoading, error, userAuth } = useSelector((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigator("/checkout/");
  };

  const onChangeHandler = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center grid grid-cols-3 gap-2">
      <div className="ml-auto">
        <Steps steps={steps} />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : message ? (
        <Message>{message}</Message>
      ) : (
        <div className="flex col-span-2 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Insert you'r address
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={submitHandler}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name ? formData.name : ""}
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="full name"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="sr-only">
                    city
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={formData.city ? formData.city : ""}
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="city"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="street" className="sr-only">
                    street
                  </label>
                  <input
                    id="street"
                    name="street"
                    value={formData.street ? formData.street : ""}
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="street"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="sr-only">
                    postal code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode ? formData.postalCode : ""}
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="postal code"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                  </span>
                  Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingScreen;

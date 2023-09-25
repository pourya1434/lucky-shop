import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Steps from "../components/steps";
import {
  decreaseCart,
  increaseCart,
  remove,
} from "../redux/slice/cart/cartSlice";

const steps = [
  {
    name: "Cart",
    description: "Items in yout cart",
    href: "/cart",
    status: "current",
  },
  {
    name: "Shipping",
    description: "Insert your address",
    href: "/shipping/",
    status: "upcoming",
  },
  {
    name: "Payment Method",
    description: "choose payment method",
    href: "/checkout/",
    status: "upcoming",
  },
  { name: "Place order", description: "order", href: "#", status: "upcoming" },
];
function CartScreen() {
  // const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const cartItems = useSelector((state) => state.cart.cartItems); // array of objects
  const dispatch = useDispatch();

  const handleDecreaseItem = (id) => {
    dispatch(decreaseCart(id));
  };

  const handleIncreaseItem = (id) => {
    dispatch(increaseCart(id));
  };
  const handleRemoveItem = (id) => {
    dispatch(remove(id));
  };
  return (
    <div className="min-h-screen items-center justify-center grid grid-cols-3 gap-2 bg-gray-50">
      <div className="ml-auto">
        <Steps steps={steps} />
      </div>
      <div className="col-span-2 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* map trough cartItems */}
        {cartItems.map((item) => {
          return (
            <div className="rounded-lg md:w-2/3" key={item.product._id}>
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={item.product.imageSrc}
                  alt={item.product.imageAlt}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.product.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      {item.product.brand}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => handleDecreaseItem(item.product._id)}
                      >
                        {" "}
                        -{" "}
                      </span>
                      {/* <input
                          className="h-9 w-9 border bg-white text-center text-xs outline-none "
                          type="number"
                          onChange={() => handleDecreaseItem(item.product._id)}
                          value={item.qty}
                          min="1"
                        /> */}
                      <span
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => handleIncreaseItem(item.product._id)}
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-red-900 hover:cursor-pointer"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <!-- Sub total --> */}

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-2/3">
          <div className="mb-2 flex-col items-center justify-between text-center">
            <p className="text-gray-700 font-bold">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              item
            </p>
            <p className="text-gray-700"></p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.product.price,
                  0
                )}{" "}
                $ USD
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to="/shipping/">
            <button className="mt-6 w-full rounded-md bg-blue-700 py-1.5 font-bold text-blue-50 hover:bg-green-600 ">
              Shiping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;

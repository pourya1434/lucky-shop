import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CartScreen() {
  const [totalprice, setTotalprice] = useState(0);

  // const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const cartItems = useSelector((state) => state.cart.cartItems); // array of objects

  const ConsoleLog = ({ children }) => {
    console.log(children);
    return false;
  };
  console.log(cartItems);

  // let price = 0;
  // useEffect(() => {
  //   calculateTotalPrice(cartItems);
  //   setTotalprice(totalprice + price);
  // }, [price, cartItems]);

  // console.log(price);
  console.log("totasl ", totalprice);

  // const calculateTotalPrice = (cartITems) => {
  //   return cartITems.reduce((acc, item) => {
  //     price = item.product.price * item.qty;
  //     // console.log("item.product.price", item.product.price, "qty", item.qty);
  //     return price;
  //   });
  // };

  return (
    <div className="container mx-auto p-1">
      <div className="h-screen pt-20">
        <div className="mx-auto max-w-5xl justify-center items-center px-6 flex-col space-y-2">
          {/* map trough cartItems */}
          {cartItems.map((item) => {
            return (
              <div className="rounded-lg md:w-2/3" key={item.product._id}>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.product.imageSrc}
                    alt="product-image"
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
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value="2"
                          min="1"
                        />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
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
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;

// TODO
// change whole page design later
// add remove
// change qty in cart page

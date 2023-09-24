import React from "react";
import Steps from "../components/steps";
import Example from "../components/with_large_images_and_progress_bars";

const steps = [
  {
    name: "Cart",
    description: "Items in yout cart",
    href: "/cart",
    status: "complete",
  },
  {
    name: "Shipping",
    description: "Insert your address",
    href: "/shipping/",
    status: "complete",
  },
  {
    name: "Payment Method",
    description: "choose payment method",
    href: "/checkout/",
    status: "complete",
  },
  {
    name: "Place order",
    description: "order",
    href: "/placeorder/",
    status: "current",
  },
];
function PlaceOrderScreen() {
  return (
    <div className="flex space-x-32 m-5 p-5">
      <div className="flex mt-36 sm:hidden md:flex">
        <Steps steps={steps} />
      </div>
      <div className="flex">
        <Example />
      </div>
    </div>
  );
}

export default PlaceOrderScreen;

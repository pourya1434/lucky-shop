import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Steps from "../components/steps";

// static data
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
    status: "complete",
  },
  {
    name: "Payment Method",
    description: "choose payment method",
    href: "/checkout/",
    status: "current",
  },
  { name: "Place order", description: "order", href: "#", status: "upcoming" },
];

const deliveryMethods = [
  {
    id: 1,
    title: "پست معمولی",
    turnaround: "چهار تا ده روز کاری",
    price: "$5.00",
  },
  {
    id: 2,
    title: "پست پیشتاز",
    turnaround: "دو تا پنج روز کاری",
    price: "$16.00",
  },
];
const paymentMethods = [
  { id: "zarin", title: "درگاه زرین پل" },
  { id: "paypal", title: "PayPal" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function CheckoutScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigator = useNavigate();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  console.log(
    "delivery method:",
    selectedDeliveryMethod,
    "payment method: ",
    selectedPaymentMethod
  );
  useEffect(() => {
    if (!shippingAddress.postalCode) {
      navigator("/shipping/");
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen items-center justify-center grid grid-cols-3 gap-2 bg-gray-50">
      <div className="ml-auto">
        <Steps steps={steps} />
      </div>

      <div className="flex col-span-2 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={submitHandler}>
          <div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>
                {/* انتخاب نوع پست */}
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                {/* انتخاب نوع پرداخت */}
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.id)
                          }
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.id)
                          }
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                className="group relative flex w-full justify-center mt-7 rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path
                      fillRule="evenodd"
                      d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutScreen;

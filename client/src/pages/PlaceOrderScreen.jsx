import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Steps from "../components/steps";
import { addOrderAction } from "../redux/slice/order/orderSlice";

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
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.cart);
  const { deliveryMethod } = useSelector((state) => state.cart);
  const { paymentMethod } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const price = cartItems.reduce(
    (acc, item) => acc + item.qty * item.product.price,
    0
  );
  const totalPrice = deliveryMethod.price + price;
  const placeOrder = () => {
    dispatch(
      addOrderAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        totalPrice: totalPrice,
        itemPrice: price,
        taxPrice: deliveryMethod.price,
        paymentMethod: paymentMethod,
        shippingPrice: deliveryMethod.price,
      })
    );
    console.log({
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
      itemPrice: price,
      taxPrice: deliveryMethod.price,
    });
  };

  return (
    <div className="flex space-x-32 m-5 p-5">
      <div className="flex mt-36 sm:hidden md:flex">
        <Steps steps={steps} />
      </div>
      <div className="flex">
        {/* cart items summary */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Order Details
            </h1>

            <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
              <dl className="flex">
                <dt className="text-gray-500">Order number&nbsp;</dt>
                <dd className="font-medium text-gray-900">W086438695</dd>
                <dt>
                  <span className="sr-only">Date</span>
                  <span className="mx-2 text-gray-400" aria-hidden="true">
                    &middot;
                  </span>
                </dt>
                <dd className="font-medium text-gray-900">
                  <time dateTime="2021-03-22">March 22, 2021</time>
                </dd>
              </dl>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View invoice
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="sr-only">Products purchased</h2>

              <div className="space-y-24">
                {cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                  >
                    <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-50">
                        <img
                          src={item.product.imageSrc}
                          alt={item.product.imageAlt}
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        <a href={`/products/${item.product._id}`}>
                          {item.product.name}
                        </a>
                      </h3>
                      <p className="mt-1 font-medium text-gray-900">
                        {item.product.price}
                      </p>
                      <p className="mt-3 text-gray-500">
                        {item.product.description}
                      </p>
                    </div>
                    <div className="sm:col-span-12 md:col-span-7">
                      <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Delivery address
                          </dt>
                          <dd className="mt-3 text-gray-500">
                            <span className="block">
                              {shippingAddress.name}
                            </span>
                            <span className="block">
                              {shippingAddress.city}
                            </span>
                            <span className="block">
                              {shippingAddress.street}
                            </span>
                            <span className="block">
                              {shippingAddress.postalCode}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Shipping updates
                          </dt>
                          <dd className="mt-3 space-y-3 text-gray-500">
                            <p>{item.product.email}</p>
                            <p>{item.product.phone}</p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing */}
            <div className="mt-24">
              <h2 className="sr-only">Billing Summary</h2>

              <div className="rounded-lg bg-gray-50 py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
                <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Payment information
                    </dt>
                    <dd className="mt-3 flex">
                      <div>
                        <svg
                          aria-hidden="true"
                          width={36}
                          height={24}
                          viewBox="0 0 36 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-auto"
                        >
                          <rect width={36} height={24} rx={4} fill="#224DBA" />
                          <path
                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                            fill="#fff"
                          />
                        </svg>
                        <p className="sr-only">Visa</p>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900">Ending with 4242</p>
                        <p className="text-gray-600">Expires 02 / 24</p>
                      </div>
                    </dd>
                  </div>
                </dl>

                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                  <div className="flex items-center justify-between pb-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">{price} $</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      {deliveryMethod.price}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-medium text-gray-900">Order total</dt>
                    <dd className="font-medium text-indigo-600">
                      {totalPrice}
                    </dd>
                  </div>
                </dl>
              </div>
              <button
                type="submit"
                onClick={placeOrder}
                className="group relative flex w-full justify-center mt-7 rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;

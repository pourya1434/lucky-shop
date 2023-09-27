import React from "react";
import { useSelector, useDispatch } from "react-redux";

function OrderScreen() {
  const { order } = useSelector((state) => state.order);
  const { shippingAddress } = order;
  const { street, city, postalCode, name } = shippingAddress;
  console.log(order);

  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center ">
      <div className="w-lg items-center justify-center m-4 py-12 px-4  sm:px-6 lg:px-8">
        <h1 className="text-left font-bold">Order number: {order._id}</h1>
        <h2 className="text-left font-bold uppercase mt-4">shipping :</h2>
        <p className="mt-2 ml-4">
          {street}, {city}, {postalCode}, {name}
        </p>
        {!order.isDelivered ? (
          <p className="mt-2 ml-4 font-semibold text-red-600">Not Delivered</p>
        ) : (
          <p className="font-semibold text-green-600">Delivered</p>
        )}
        <h2 className="text-left font-bold uppercase mt-4">Price :</h2>
        <p className="mt-2 ml-4 font-bold">{order.totalPrice} $</p>
        {!order.isPaid ? (
          <p className="mt-2 ml-4 font-semibold text-red-600">Not Paid</p>
        ) : (
          <p className="font-semibold text-green-600">Paid</p>
        )}
        <h2 className="text-left font-bold uppercase mt-4">Order Items :</h2>
        {order.orderItems.map((item) => (
          <div key={item._id}>
            <p className="ml-2 mt-4">
              Product: {item.name} X {item.qty}
            </p>
          </div>
        ))}
        <button
          type="button"
          className="group relative flex w-full justify-center mt-7 rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-green-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          pay with {order.paymentMethod === "zarin" ? "زرین پال" : "paypal"}
        </button>
        <h5 className="mt-10 text-left font-semibold italic">
          Thank's dear {order.user.name} for choosing us
        </h5>
      </div>
    </div>
  );
}

export default OrderScreen;

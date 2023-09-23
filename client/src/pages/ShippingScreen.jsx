import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { saveShippingAddress } from '../redux/slice/cart/cartSlice'

function ShippingScreen() {
    const {shippingAddress} = useSelector((state)=> state.cart)

    const [formData, SetFormData] = useState({
        name: shippingAddress.name,
        city: shippingAddress.city,
        street: shippingAddress.street,
        postalCode: shippingAddress.postalCode
      })
      const [message, setMessage] = useState("")
      const dispatch = useDispatch();
      const navigator = useNavigate();
      const { isLoading, error, userAuth } = useSelector((state) => state.user);
      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData))
        navigator('/checkout/')
      };

      const onChangeHandler = (e) => {
        SetFormData({...formData, [e.target.name]: e.target.value})
      }
  return (
    <>
    
    {isLoading ? (<Loader />) : error ? (<Message>{error}</Message>) : message ? (<Message>{message}</Message>) : (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/">
              <h1 className="text-3xl font-bold font-handwrite text-center">
                Lucky.
              </h1>
            </Link>
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
                  value={formData.name}
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
                  value={formData.city}
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
                  value={formData.street}
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
                  value={formData.postalCode}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                    </svg>

                </span>
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    )
    }
  </>
  )
}

export default ShippingScreen
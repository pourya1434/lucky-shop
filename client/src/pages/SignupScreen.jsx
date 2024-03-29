import { LockClosedIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { registerUserAction } from "../redux/slice/users/userSlice";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [matchpassword, setMatchpassword] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { userAuth, isLoading, error } = useSelector((state) => state.user);
  //  console.log(userAuth)

  useEffect(() => {
    if (Object.keys(userAuth.userInfo).length !== 0) {
      navigator("/");
    }
  }, [userAuth.userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData["password"] !== formData["confirmPassword"]) {
      setMatchpassword("The passwords are not matched, try again");
    } else {
      dispatch(registerUserAction(formData));
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : matchpassword ? (
        <Message>{matchpassword}</Message>
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <Link to="/">
                <h1 className="text-3xl font-bold font-handwrite text-center">
                  Lucky.
                </h1>
              </Link>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up an account
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
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Passwordour account
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Passwordour account
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm Password"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="accept-terms"
                    name="accept-terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="accept-terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    accept terms and conditions
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

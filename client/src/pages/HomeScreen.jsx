import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { fetchProductsAction } from "../redux/slice/products/productSlice";

function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const { isLoading, products, error } = useSelector((state) => state?.product);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <h2 className="text-4xl text-gray-800 font-bold pt-12 m-6">
          Loading ...
        </h2>
      ) : error ? (
        <h1 className="text-4xl text-red-700 font-bold pt-12 m-6">{error}</h1>
      ) : (
        <>
          <Product products={products} />
         
        </>
      )}
    </div>
  );
}

export default HomeScreen;

// import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Product from "../components/Product";
// import { products } from "../products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../redux/slice/products/productSlice";

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  // old way
  // useEffect(() => {
  //   async function fetchProducts() {
  //     const { data } = await axios.get("/api/products/");
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  // new way
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const { isLoading, products, error } = useSelector((state) => state?.product);
  console.log("isLoading", isLoading, "product", products, "errors", error);

  return (
    <div>
      {isLoading ? (
        <h2 className="text-4xl text-gray-800 font-bold pt-12 m-6">
          Loading ...
        </h2>
      ) : error ? (
        <h1 className="text-4xl text-red-700 font-bold pt-12 m-6">{error}</h1>
      ) : (
        <>
          <Product products={products} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomeScreen;

// import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Product from "../components/Product";
// import { products } from "../products";
import { useDispatch } from "react-redux";
import { fetchProductAction } from "../redux/slice/products/productSlice";

function HomeScreen() {
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      <Product products={products} />
      <Footer />
    </div>
  );
}

export default HomeScreen;

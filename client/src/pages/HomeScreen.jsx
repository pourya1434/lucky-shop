import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Product from "../components/Product";
// import { products } from "../products";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Product products={products} />
      <Footer />
    </div>
  );
}

export default HomeScreen;

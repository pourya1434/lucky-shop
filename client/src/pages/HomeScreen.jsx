import React from "react";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { products } from "../products";

function HomeScreen() {
  return (
    <div>
      <Product products={products} />
      <Footer />
    </div>
  );
}

export default HomeScreen;

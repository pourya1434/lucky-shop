import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
// import { product } from "../products";

function ProductScreen() {
  let { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}/`);
      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductScreen;

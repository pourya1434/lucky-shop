import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { fetchProductAction } from "../redux/slice/products/productSlice";

function ProductScreen() {
  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [dispatch, id]);

  const { isLoading, product, error } = useSelector((state) => state?.product);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <h2 className="text-4xl text-gray-800 font-bold pt-12 m-6">
          Loading ...
        </h2>
      ) : error ? (
        <h1 className="text-4xl text-red-700 font-bold pt-12 m-6">{error}</h1>
      ) : (
        <ProductDetails product={product} />
      )}
    </div>
  );
}

export default ProductScreen;

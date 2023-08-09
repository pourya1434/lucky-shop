import React from "react";
import ProductDetails from "../components/ProductDetails";
import { faqs, license, product, reviews } from "../products";

function ProductScreen() {
  return (
    <div>
      <ProductDetails
        product={product}
        faqs={faqs}
        license={license}
        reviews={reviews}
      />
    </div>
  );
}

export default ProductScreen;

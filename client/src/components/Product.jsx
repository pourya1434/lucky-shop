import { StarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Product({ products }) {
  if (products === undefined)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  return (
    // global container
    <div className="container max-w-6xl mx-auto px-5 py-12">
      {/* header  */}
      <div className="flex items-center">
        {/* title */}
        <h2 className="text-2xl mb-10 font-semibold uppercase text-left">
          latest products
        </h2>
      </div>
      {/* grid */}
      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
          >
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="pt-10 pb-4 text-center">
              <h3 className="text-sm font-medium text-gray-900">
                {/* CHANGE HREF LINK HERE */}
                <Link to={`/products/${product._id}/`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <div className="mt-3 flex flex-col items-center">
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {product.reviewCount} reviews
                </p>
              </div>
              <p className="mt-4 text-base font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

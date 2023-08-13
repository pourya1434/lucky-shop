import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/products/productSlice";
// import reducers
const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;

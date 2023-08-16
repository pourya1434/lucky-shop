import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cart/cartSlice";
import productReducer from "../slice/products/productSlice";
// import reducers
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;

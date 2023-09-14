import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cart/cartSlice";
import productReducer from "../slice/products/productSlice";
import userReducer from "../slice/users/userSlice";
// import reducers
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;

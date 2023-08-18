import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
// "cart/addCartItem",

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      console.log(state.cartItems);
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      console.log(existingIndex);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty:
            Number(state.cartItems[existingIndex].qty) +
            Number(action.payload.qty),
        };
      } else {
        // let tempProductItem = { ...action.payload };
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// reducer
export const { add } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

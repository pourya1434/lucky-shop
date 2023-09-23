import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
};
// "cart/addCartItem",

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty:
            Number(state.cartItems[existingIndex].qty) +
            Number(action.payload.qty),
        };
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      // console.log("state cartItems ==>", current(state.cartItems));
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload
      );
      if (state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
      } else if (state.cartItems[itemIndex].qty === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload
        );
        state.cartItems = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload
      );

      state.cartItems[itemIndex].qty += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    remove(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload
      );
      const nextCartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress))
    }
  },
});

// reducer
export const { add, decreaseCart, increaseCart, remove, saveShippingAddress } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

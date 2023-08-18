import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// "cart/addCartItem",

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
  },
});

// reducer
export const { add } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

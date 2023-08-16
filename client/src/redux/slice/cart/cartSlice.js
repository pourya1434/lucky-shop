import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state

const initialState = {
  cartItems: [],
};

// action thunk creator
export const cartAction = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ id, qty }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}/`);
      const items: any[] = [];
      items.push({
        product: data._id,
        name: data.name,
        price: data.price,
        imageSrc: data.imageSrc,
        countInStock: data.counterInStock,
        qty: qty,
      });
      return items;
    } catch (error) {
      return error.message;
    }
  }
);

// create slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(cartAction.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
  },
});

// reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;

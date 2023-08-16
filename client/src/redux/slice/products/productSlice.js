import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initialState
const initialState = {
  isLoading: false,
  products: [],
  product: {},
  error: "",
};

// action creator
// fetch all products
export const fetchProductsAction = createAsyncThunk(
  "products/fetchAllProdcuts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/products/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// fetch single product
export const fetchProductAction = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}/`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // get all products
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get single product
    builder.addCase(fetchProductAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
// reducer
const productReducer = productSlice.reducer;
export default productReducer;

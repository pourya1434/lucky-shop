import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// initialState
const initialState = {
  isLoading: false,
  products: [],
  product: {},
  error: "",
};

// action creator
export const fetchProductAction = createAsyncThunk(
  "products/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/products/");
      return res.data;
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
    builder.addCase(fetchProductAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
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

// TODO
// گرفتن سینگل پروداکت. الان خودش اکسیوس میزنه ولی اسلایس نداره

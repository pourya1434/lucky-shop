import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// initialState
const initialState = {
  isLodaing: true,
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
      state.isLodaing = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.isLodaing = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.isLodaing = false;
      state.error = action.payload;
    });
  },
});
// reducer
const productReducer = productSlice.reducer;
export default productReducer;

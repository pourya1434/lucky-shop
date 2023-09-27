import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  success: false,
  order: [],
  error: "",
};

// action creator
export const addOrderAction = createAsyncThunk(
  "order/add",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // token
      const {
        user: {
          userAuth: {
            userInfo: { token },
          },
        },
      } = getState();
      console.log("token => ", token);
      // header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/orders/add/", payload, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    // add order
    builder.addCase(addOrderAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrderAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = action.payload;
    });
    builder.addCase(addOrderAction.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

// reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;

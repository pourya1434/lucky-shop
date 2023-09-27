import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  success: false,
  order: [],
  userOrder: [],
  error: "",
};

// action creator
export const addOrderAction = createAsyncThunk(
  "order/add",
  async (payload, { rejectWithValue, getState }) => {
    console.log("payload", payload);
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
// get single order by id
export const getOrderAction = createAsyncThunk(
  "order/get",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      // token
      const {
        user: {
          userAuth: {
            userInfo: { token },
          },
        },
      } = getState();
      // header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}/`, config);
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
    // get order
    builder.addCase(getOrderAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userOrder = action.payload;
    });
    builder.addCase(getOrderAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  user: {},
  error: "",
  profile: {},
  userAuth: {
    loading: false,
    error: "",
    userInfo: localStorage.getItem("userInfo")
      ? JSON.stringify(localStorage.getItem("userInfo"))
      : {},
  },
};

// action creator
// register
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue }) => {
    try {
      // header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "api/users/register/",
        {
          username: payload.email,
          password: payload.password,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
  },
});

// reducer
const userReducer = userSlice.reducer;
export default userReducer;

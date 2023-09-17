import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  userAuth: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.stringify(localStorage.getItem("userInfo"))
      : {},
  },
};
// action creator

// login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      // header
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        "api/users/login/",
        {
          username: payload.email,
          password: payload.password,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// register
export const registerUserAction = createAsyncThunk(
  "user/register",
  async(payload, {rejectWithValue}) => {
    try {
      // header
      const config = {
        "Content-Type": 'application/json'
      }
      const {data} = axios.post(
        "/api/users/register/",
        {
          name: payload.email,
          email: payload.email,
          password: payload.password
        },
        config
      )
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userAuth.userInfo = action.payload
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })
  },
});

// reducer
const userReducer = userSlice.reducer;
export default userReducer;

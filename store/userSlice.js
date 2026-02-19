"use client";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/user/register`,formData,{withCredentials:true});
        toast.success("Registered Successfully!")
        console.log('register: ', response.data)
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error in Registration")
        console.log('Error in login: ', error)
        return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
      }
    }
  );
  export const loginUser = createAsyncThunk(
  "user/login",
  async (formData,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/user/login`,formData,{withCredentials:true});
      toast.success("Logged In Successfully!")
      console.log('login: ', response.data)
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error in Login")
        console.log('Error in login: ', error)
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
  export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/user/logout`,{},{withCredentials:true});
      toast.success("Logged Out Successfully!")
      console.log('logout: ', response.data)
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error in Logout")
      console.log('Error in logout: ', error)
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URI}/api/user/check-auth`,
        { withCredentials: true }
      );
      console.log('autho: ', res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userId: null,
    token: "",
    isAuthorized:false,
    authChecked:false,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Login";
      });
      builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthorized = true;
        state.authChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Login";
      });
      builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user=null;
        state.token="";
        state.isAuthorized = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Logout";
      });
      builder
      .addCase(checkAuth.pending, (state) => {
    state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.userId=action.payload.user;
        state.isAuthorized=action.payload.isAuthenticated;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthorized=false;
        state.user=null;
        state.error = action.payload || "Failed to Authorize";
      });
  },
});

export default userSlice.reducer
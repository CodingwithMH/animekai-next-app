"use client";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/api/ads/`,{withCredentials:true});
        console.log('Ads: ', response.data)
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error in Fetching Ads")
        console.log('Error in login: ', error)
        return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
      }
    }
  );
export const addAds = createAsyncThunk(
  "ads/addAds",
  async ({formData},thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/ads/`,formData,{withCredentials:true});
        toast.success("Ad Added Successfully!")
        thunkAPI.dispatch(fetchAds());
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error in Adding Ad")
        console.log('Error in Adding Add: ', error)
        return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
      }
    }
  );
export const deleteAd = createAsyncThunk(
  "ads/deleteAds",
  async (id,thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URI}/api/ads/${id}`,{withCredentials:true});
        toast.success("Ad Deleted Successfully!")
        console.log('Deleting Ads: ', response.data)
        thunkAPI.dispatch(fetchAds());
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error in Deleting Ad")
        console.log('Error in Deleting Add: ', error)
        return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
      }
    }
  );
export const updateAd = createAsyncThunk(
  "ads/updateAds",
  async ({id,formData},thunkAPI) => {
    try {
      console.log('FomdataUpdate', formData)
      const response = await axios.put(`${BASE_URI}/api/ads/${id}`,formData,{withCredentials:true});
        toast.success("Ad Updated Successfully!")
        console.log('Updated Ads: ', response.data)
        thunkAPI.dispatch(fetchAds());
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error in Updating Ad")
        console.log('Error in Deleting Add: ', error)
        return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
      }
    }
  );

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Login";
      });
    builder
      .addCase(addAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAds.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Add ad";
      });
    builder
      .addCase(deleteAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Delete ad";
      });
    builder
      .addCase(updateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Update ad";
      });
  },
});

export default adsSlice.reducer
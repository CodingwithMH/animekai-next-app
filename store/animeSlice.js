"use client";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
export const fetchAnimes = createAsyncThunk(
  "animes/fetchAnimes",
  async ({id,page},thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/admin/anime?page=${page}&limit=20`,{id},
        {withCredentials:true}
      );
      console.log('Animes', response.data)
      return response.data;
    } catch (error) {
        console.log('Error: ', error)
      return thunkAPI.rejectWithValue(error.response?.data.error || error.message);
    }
  }
);
export const fetchAnimesByFilters = createAsyncThunk(
  "animes/fetchAnimesByFilters",
  async ({filters},thunkAPI) => {
    console.log('Applied Filters', filters)
    try {
      const response = await axios.post(`${BASE_URI}/api/filter`,filters);
      console.log('Filtered: ', response.data )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
export const fetchFeaturedAnimes = createAsyncThunk(
  "animes/fetchFeaturedAnimes",
  async (id,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URI}/api/admin/featured/${id}`);
      console.log('Featured redux: ', response.data )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
export const addFeaturedAnime = createAsyncThunk(
  "animes/addFeaturedAnime",
  async ({id, image,userId},thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/admin/featured`,{id,image},{withCredentials:true});
      console.log('Featured redux: ', response.data )
      toast.success("Anime Added Successfully!")
      thunkAPI.dispatch(fetchFeaturedAnimes(userId));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
export const removeFeaturedAnime = createAsyncThunk(
  "animes/removeFeaturedAnime",
  async ({id, userId},thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URI}/api/admin/featured/${id}`,{id},{withCredentials:true});
      console.log('Delete Featured redux: ', response.data )
      toast.success("Anime Deleted Successfully!")
      thunkAPI.dispatch(fetchFeaturedAnimes(userId));
      return response.data;
    } catch (error) {
      console.log('Error in deleting featured Anime', error)
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
export const editAnime = createAsyncThunk(
  "animes/removeFeaturedAnime",
  async ({id,formData},thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URI}/api/admin/featured/${id}`,formData,{withCredentials:true});
      console.log('Update: ', response.data )
      toast.success("Anime Updated Successfully!")
      return response.data;
    } catch (error) {
      console.log('Error in Updating Anime', error)
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

const animeSlice = createSlice({
  name: "animes",
  initialState: {
    animes: [],
    totalPages:1,
    animeById: null,
    filteredAnimes:[],
    relatedAnimes:[],
    filteredResultsPages:1,
    totalFilteredResults:0,
    featured:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.loading = false;
        state.animes = action.payload.animes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch animes";
      });
      builder
      .addCase(fetchAnimesByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimesByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredAnimes = action.payload.results;
        state.totalFilteredResults = action.payload.total;
        state.filteredResultsPages = action.payload.totalPages;
      })
      .addCase(fetchAnimesByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch animes";
      });
      builder
      .addCase(fetchFeaturedAnimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedAnimes.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedAnimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch featured animes";
      });
      builder
      .addCase(addFeaturedAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeaturedAnime.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addFeaturedAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Add featured animes";
      });
  },
});

export default animeSlice.reducer
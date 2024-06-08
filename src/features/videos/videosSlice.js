import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getVideos from "./videosAPI";

export const initialState = {
	isLoading: true,
	videos: [],
	isError: false,
	error: "",
};

// async thunk function
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async ({tags, search}) => {
	const videos = await getVideos(tags, search);
	return videos;
});

// slice for videos
const videoSlice = createSlice({
	name: "videos",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideos.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload;
			})
			.addCase(fetchVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.videos = [];
				state.error = action.error?.message;
			});
	},
});

export default videoSlice.reducer;

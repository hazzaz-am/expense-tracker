import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getSingleVideo from "./singleVideoAPI";

export const initialState = {
	isLoading: true,
	video: {},
	isError: false,
	error: "",
};

// async thunk function
export const fetchSingleVideo = createAsyncThunk(
	"video/fetchSingleVideo",
	async (id) => {
		const video = await getSingleVideo(id);
		return video;
	}
);

// slice for video
const singleVideoSlice = createSlice({
	name: "video",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchSingleVideo.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchSingleVideo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.video = action.payload;
			})
			.addCase(fetchSingleVideo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.video = {};
				state.error = action.error?.message;
			});
	},
});

export default singleVideoSlice.reducer;

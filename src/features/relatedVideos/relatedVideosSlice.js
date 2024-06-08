import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getRelatedVideos from "./relatedVideoAPI";

export const initialState = {
	isLoading: true,
	relatedVideos: [],
	isError: false,
	error: "",
};

// async thunk function
export const fetchRelatedVideos = createAsyncThunk(
	"relatedVideos/fetchRelatedVideos",
	async ({ tags, id }) => {
		const relatedVideos = await getRelatedVideos({ tags, id });
		return relatedVideos;
	}
);

// slice for relatedVideos
const relatedVideosSlice = createSlice({
	name: "relatedVideos",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchRelatedVideos.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.relatedVideos = action.payload;
			})
			.addCase(fetchRelatedVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.relatedVideos = [];
				state.error = action.error?.message;
			});
	},
});

export default relatedVideosSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getTags from "./tagsAPI";


export const initialState = {
	isLoading: true,
	tags: [],
	isError: false,
	error: "",
};

// async thunk function
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
	const tags = await getTags();
	return tags;
});

// slice for videos
const tagsSlice = createSlice({
	name: "videos",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchTags.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tags = action.payload;
			})
			.addCase(fetchTags.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.tags = [];
				state.error = action.error?.message;
			});
	},
});

export default tagsSlice.reducer;

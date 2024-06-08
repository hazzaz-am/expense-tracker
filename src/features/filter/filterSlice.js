import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	tags: [],
	search: "",
};

// slice for videos
const filterSlice = createSlice({
	name: "videos",
	initialState,
	reducers: {
		addTag: (state, action) => {
			state.tags.push(action.payload);
		},
		removeTag: (state, action) => {
			const indexToRemove = state.tags.indexOf(action.payload);
			if (indexToRemove !== -1) {
				state.tags.splice(indexToRemove, 1);
			}
		},
		searched: (state, action) => {
			state.search = action.payload;
		},
	},
});

export default filterSlice.reducer;
export const { addTag, removeTag, searched } = filterSlice.actions;

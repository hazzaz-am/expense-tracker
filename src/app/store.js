import { configureStore } from "@reduxjs/toolkit";
import singleVideoReducer from "../features/singleVideo/singleVideoSlice";
import tagsReducer from "../features/tags/tagsSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
	reducer: {
		videos: videosReducer,
		tags: tagsReducer,
		video: singleVideoReducer,
	},
});

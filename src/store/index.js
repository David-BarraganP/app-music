import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import playlistSlice from "./slices/playlist.slice";

export default configureStore({
    reducer: {
        user: userSlice,
        playlist: playlistSlice,
    },
})
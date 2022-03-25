import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import roomsSlice from "./roomsReducer";

const store = configureStore({
  reducer: { search: searchSlice.reducer, rooms: roomsSlice.reducer },
});

export default store;

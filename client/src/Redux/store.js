import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import roomsSlice from "./roomsReducer";
import hotelSlice from "./hotelReducer";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    rooms: roomsSlice.reducer,
    hotel: hotelSlice.reducer,
  },
});

export default store;

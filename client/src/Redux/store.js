import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import roomsSlice from "./roomsReducer";
import hotelSlice from "./hotelReducer";
import authSlice from "./authReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    rooms: roomsSlice.reducer,
    hotel: hotelSlice.reducer,
  },
});

export default store;

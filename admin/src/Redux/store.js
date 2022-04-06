import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventReducer";
import hotelSlice from "./hotelReducer";

const store = configureStore({
  reducer: {
    event: eventSlice.reducer,
    hotel: hotelSlice.reducer,
  },
});

export default store;

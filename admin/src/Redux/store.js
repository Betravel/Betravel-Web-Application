import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventReducer";
import hotelSlice from "./hotelReducer";
import userSlice from "./userReducer";

const store = configureStore({
  reducer: {
    event: eventSlice.reducer,
    hotel: hotelSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import authSlice from "./authReducer";
import reservationSlice from "./reservationReducer";
import eventSlice from "./eventReducer";
import hotelsSlice from "./hotelsReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    reservation: reservationSlice.reducer,
    event: eventSlice.reducer,
    hotels: hotelsSlice.reducer,
  },
});

export default store;

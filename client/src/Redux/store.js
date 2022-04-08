import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import authSlice from "./authReducer";
import reservationSlice from "./reservationReducer";
import eventSlice from "./eventReducer";
import hotelsSlice from "./hotelsReducer";
import reservationsSlice from "./reservationsReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    reservation: reservationSlice.reducer,
    reservations: reservationsSlice.reducer,
    event: eventSlice.reducer,
    hotels: hotelsSlice.reducer,
  },
});

export default store;

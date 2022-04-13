import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import authSlice from "./authReducer";
import reservationSlice from "./reservationReducer";
import eventSlice from "./eventReducer";
import hotelsSlice from "./hotelsReducer";
import reservationsSlice from "./reservationsReducer";
import eventsSlice from "./eventsReducer";
import navbarSlice from "./navbarReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navbar: navbarSlice.reducer,
    search: searchSlice.reducer,
    reservation: reservationSlice.reducer,
    reservations: reservationsSlice.reducer,
    event: eventSlice.reducer,
    events: eventsSlice.reducer,
    hotels: hotelsSlice.reducer,
  },
});

export default store;

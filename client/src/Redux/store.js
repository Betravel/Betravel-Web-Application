import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import authSlice from "./authReducer";
import hotelSlice from "./hotelReducer";
import eventSlice from "./eventReducer";
import hotelsSlice from "./hotelsReducer";
import hotelreservationsSlice from "./hotelreservationsReducer";
import eventsSlice from "./eventsReducer";
import navbarSlice from "./navbarReducer";
import tripSlice from "./tripReducer";
import eventreservationsSlice from "./eventreservationsReducer";
import tripreservationsSlice from "./tripreservationsReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navbar: navbarSlice.reducer,
    search: searchSlice.reducer,
    hotel: hotelSlice.reducer,
    hotels: hotelsSlice.reducer,
    hotelreservations: hotelreservationsSlice.reducer,
    event: eventSlice.reducer,
    events: eventsSlice.reducer,
    eventreservations: eventreservationsSlice.reducer,
    trip: tripSlice.reducer,
    tripreservations: tripreservationsSlice.reducer,
  },
});

export default store;

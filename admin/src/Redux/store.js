import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventReducer";
import eventReservationSlice from "./eventreservationReducer";
import hotelSlice from "./hotelReducer";
import hotelReservationSlice from "./hotelreservationsReducer";
import tripSlice from "./tripreservationReducer";
import userSlice from "./userReducer";

const store = configureStore({
  reducer: {
    event: eventSlice.reducer,
    eventreservation: eventReservationSlice.reducer,
    hotel: hotelSlice.reducer,
    hotelreservation: hotelReservationSlice.reducer,
    trip: tripSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

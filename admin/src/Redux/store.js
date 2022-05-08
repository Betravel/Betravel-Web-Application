import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventReducer";
import eventReservationSlice from "./eventreservationReducer";
import hotelSlice from "./hotelReducer";
import hotelReservationSlice from "./hotelreservationsReducer";
import overviewlocationSlice from "./locationReducer";
import pricesSlice from "./pricesReducer";
import overviewSlice from "./reservationoverviewReducer";
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
    prices: pricesSlice.reducer,
    overview: overviewSlice.reducer,
    location: overviewlocationSlice.reducer,
  },
});

export default store;

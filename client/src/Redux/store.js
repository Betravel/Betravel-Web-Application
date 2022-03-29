import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchReducer";
import authSlice from "./authReducer";
import reservationSlice from "./reservationReducer";
import eventSlice from "./eventReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    reservation: reservationSlice.reducer,
    event: eventSlice.reducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationEvent/get/" + id)
      .then((res) =>
        dispatch(eventreservationsActions.getreservations(res.data))
      );
  };
};

const initialEventReservationsState = [];

const eventreservationsSlice = createSlice({
  name: "eventreservations",
  initialState: initialEventReservationsState,
  reducers: {
    getreservations(state, action) {
      let reservations = action.payload;
      reservations.forEach((reservation, i) => {
        reservation.event.date.day = new Date(reservation.event.date.day);
        reservation.event.date.from = new Date(reservation.event.date.from);
        reservation.event.date.to = new Date(reservation.event.date.to);
        state[i] = reservation;
      });
    },
  },
});

export const eventreservationsActions = eventreservationsSlice.actions;
export default eventreservationsSlice;

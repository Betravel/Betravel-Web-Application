import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservation/get/" + id)
      .then((res) => dispatch(reservationsActions.getreservations(res.data)));
  };
};

const initialReservationsState = [];

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: initialReservationsState,
  reducers: {
    getreservations(state, action) {
      let reservations = action.payload;
      reservations.forEach((reservation) => {
        reservation.periode[0] = new Date(reservation.periode[0]);
        reservation.periode[1] = new Date(reservation.periode[1]);
        state.push(reservation);
      });
    },
  },
});

export const reservationsActions = reservationsSlice.actions;
export default reservationsSlice;

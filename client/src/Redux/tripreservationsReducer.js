import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTripReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/trip/getuser/" + id)
      .then((res) =>
        dispatch(tripreservationsActions.getreservations(res.data))
      );
  };
};

const initialTripReservationsState = [];

const tripreservationsSlice = createSlice({
  name: "tripreservations",
  initialState: initialTripReservationsState,
  reducers: {
    getreservations(state, action) {
      let reservations = action.payload;
      reservations.forEach((reservation, i) => {
        reservation.periode[0] = new Date(reservation.periode[0]);
        reservation.periode[1] = new Date(reservation.periode[1]);
        state[i] = reservation;
      });
    },
  },
});

export const tripreservationsActions = tripreservationsSlice.actions;
export default tripreservationsSlice;

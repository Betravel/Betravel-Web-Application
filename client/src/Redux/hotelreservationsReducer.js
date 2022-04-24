import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotelReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationHotel/getuser/" + id)
      .then((res) =>
        dispatch(hotelreservationsActions.getreservations(res.data))
      );
  };
};

const initialHotelReservationsState = [];

const hotelreservationsSlice = createSlice({
  name: "hotelreservations",
  initialState: initialHotelReservationsState,
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

export const hotelreservationsActions = hotelreservationsSlice.actions;
export default hotelreservationsSlice;

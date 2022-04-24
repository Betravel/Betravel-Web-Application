import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventReservation = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationEvent/get/" + id)
      .then((res) =>
        dispatch(eventreservationsActions.geteventreservation(res.data))
      );
  };
};

const initialEventReservationState = {
  id: "",
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
  event: {
    name: "",
    location: "",
    type: "",
    description: "",
    date: { day: new Date(), from: new Date(), to: new Date() },
    periode: 0,
    price: 0,
    program: [{ hour: new Date(), text: "" }],
    note: [""],
    image: [],
    places: 0,
  },
  reservedplace: 0,
  details: [],
  price: 0,
  status: "canceled",
  paiement: "",
};

const eventReservationSlice = createSlice({
  name: "eventreservation",
  initialState: initialEventReservationState,
  reducers: {
    geteventreservation(state, action) {
      let reservation = action.payload;
      state.id = reservation._id;
      state.user = reservation.user;
      state.event = reservation.event;
      state.reservedplace = reservation.reservedplace;
      state.details = reservation.details;
      state.price = reservation.price;
      state.status = reservation.status;
      state.paiement = reservation.paiement;
    },
  },
});

export const eventreservationsActions = eventReservationSlice.actions;

export default eventReservationSlice;

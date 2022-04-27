import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrip = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/trip/get/" + id)
      .then((res) => dispatch(tripActions.gettrip(res.data)));
  };
};

const initialTripState = {
  id: "",
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
  typeDestination: "uni",
  nbrDestination: 1,
  destinations: [""],
  periode: [new Date(), new Date()],
  nuits: 0,
  nbrPersonnes: 1,
  personnes: [{ firstname: "", lastname: "" }],
  events: [],
  options: [],
  status: "canceled",
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initialTripState,
  reducers: {
    gettrip(state, action) {
      let reservation = action.payload;
      state.id = reservation._id;
      state.user = reservation.user;
      state.typeDestination = reservation.typeDestination;
      state.nbrDestination = reservation.nbrDestination;
      state.destinations = reservation.destinations;
      state.periode = reservation.periode;
      state.nuits = reservation.nuits;
      state.nbrPersonnes = reservation.nbrPersonnes;
      state.personnes = reservation.personnes;
      state.events = reservation.events;
      state.options = reservation.options;
      state.status = reservation.status;
    },
  },
});

export const tripActions = tripSlice.actions;

export default tripSlice;

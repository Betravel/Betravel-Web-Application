import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvent = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/event/" + id)
      .then((res) => dispatch(eventActions.getEvent(res.data)));
  };
};
const initialEventState = {
  event: {
    name: "",
    location: "",
    type: "",
    description: "",
    date: { day: new Date(), from: new Date(), to: new Date() },
    periode: "",
    price: 0,
    program: [],
    note: [],
    images: [],
  },
  user: {
    firstname: "",
    lastname: "",
    phone: 0,
    email: "",
  },
  reservedplace: 0,
  paiement: "payment at the agency",
  details: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState: initialEventState,
  reducers: {
    getUser(state, action) {
      let user = action.payload;
      state.user = user;
    },
    getEvent(state, action) {
      let event = action.payload;
      state.event.name = event.name;
      state.event.location = event.location;
      state.event.type = event.type;
      state.event.description = event.description;
      state.event.date.day = new Date(event.date.day);
      state.event.date.from = new Date(event.date.from);
      state.event.date.to = new Date(event.date.to);
      state.event.periode = event.periode;
      state.event.price = event.price;
      state.event.program = event.program;
      state.event.note = event.note;
      state.event.images = event.images;
    },
    updatePlace(state, action) {
      state.reservedplace = action.payload;
      let details = [];
      for (let index = 0; index < state.reservedplace; index++) {
        details.push({ firstname: "", lastname: "" });
      }
      state.details = details;
    },
    updatedetails(state, action) {
      let index = action.payload.index;
      if (action.payload.type === "firstname") {
        state.details[index].firstname = action.payload.value;
      } else if (action.payload.type === "lastname") {
        state.details[index].lastname = action.payload.value;
      }
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice;

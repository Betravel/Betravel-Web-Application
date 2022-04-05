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
    price: 0,
    date: "",
    hour: "",
    periode: "",
    program: [],
    note: "",
  },
  user: {
    firstname: "",
    lastname: "",
    phone: 0,
    email: "",
  },
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
      state.event.price = event.price;
      state.event.date = event.date;
      state.event.hour = event.hour;
      state.event.periode = event.periode;
      state.event.program = event.program;
      state.event.note = event.note;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice;

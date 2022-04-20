import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = (Destination) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/event/all")
      .then((res) => {
        dispatch(eventsActions.getevents(res.data));
      });
  };
};

const initialEventsState = [];

const eventsSlice = createSlice({
  name: "events",
  initialState: initialEventsState,
  reducers: {
    getevents(state, action) {
      let events = action.payload;
      for (let index = 0; index < events.length; index++) {
        const element = events[index];
        element.date.day = new Date(element.date.day);
        element.date.from = new Date(element.date.from);
        element.date.to = new Date(element.date.to);
        state[index] = element;
      }
    },

  },
});

export const eventsActions = eventsSlice.actions;
export default eventsSlice;

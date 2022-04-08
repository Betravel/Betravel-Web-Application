import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvent = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/event/" + id)
      .then((res) => dispatch(eventActions.getevent(res.data)));
  };
};

const initialEventState = {
  name: "",
  location: "",
  type: "camping",
  description: "",
  date: { day: new Date(), from: new Date(), to: new Date() },
  periode: 0,
  price: 0,
  program: [{ hour: new Date(), text: "" }],
  note: [""],
  image: [],
  places: 0,
};

const eventSlice = createSlice({
  name: "event",
  initialState: initialEventState,
  reducers: {
    getevent(state, action) {
      const event = action.payload;
      state.name = event.name;
      state.location = event.location;
      state.type = event.type;
      state.description = event.description;
      state.date = event.date;
      state.periode = event.periode;
      state.price = event.price;
      state.program = event.program;
      state.note = event.note;
      state.image = event.image;
      state.places = event.places;
    },
    updateevent(state, action) {
      switch (action.payload.type) {
        case "name":
          state.name = action.payload.value;
          break;
        case "location":
          state.location = action.payload.value;
          break;
        case "description":
          state.description = action.payload.value;
          break;
        case "type":
          state.type = action.payload.value;
          state.program = [];
          break;
        case "date":
          state.date.day = action.payload.value;
          break;
        case "fromdate":
          state.date.from = action.payload.value;
          break;
        case "todate":
          state.date.to = action.payload.value;
          break;
        case "price":
          state.price = parseInt(action.payload.value);
          break;
        case "places":
          state.places = parseInt(action.payload.value);
          break;
        default:
          break;
      }
      let periode = state.date.to - state.date.from;
      if (state.type === "randonne") {
        state.periode = parseInt(periode / (1000 * 60 * 60));
      } else {
        state.periode = parseInt(periode / (1000 * 60 * 60 * 24));
      }
    },
    manageProgram(state, action) {
      let program = [];
      let i = action.payload.index;
      if (action.payload.type === "add") {
        program = state.program;
        program.push({ hour: new Date(), text: "" });
      } else if (action.payload.type === "reduce") {
        for (let index = 0; index < state.program.length; index++) {
          const element = state.program[index];
          if (index !== i) {
            program.push(element);
          }
        }
      }
      state.program = program;
    },
    updateProgram(state, action) {
      let index = action.payload.index;
      if (action.payload.type === "programhour") {
        state.program[index].hour = action.payload.value;
      } else if (action.payload.type === "programtext") {
        state.program[index].text = action.payload.value;
      }
    },
    manageNote(state, action) {
      let note = [];
      let i = action.payload.index;
      if (action.payload.type === "add") {
        note = state.note;
        note.push("");
      } else if (action.payload.type === "reduce") {
        for (let index = 0; index < state.note.length; index++) {
          const element = state.note[index];
          if (index !== i) {
            note.push(element);
          }
        }
      }
      state.note = note;
    },
    updateNote(state, action) {
      let index = action.payload.index;
      state.note[index] = action.payload.value;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice;

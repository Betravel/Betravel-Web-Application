import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvent = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/event/" + id)
      .then((res) => dispatch());
  };
};

const initialEventState = {
  name: "",
  location: "",
  type: "",
  date: [new Date(), new Date()],
  periode: "",
  price: 0,
  program: [{ hour: new Date(), text: "" }],
  note: [""],
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
      state.periode = event.periode;
      state.program = event.program;
      state.note = event.note;
    },
    updateevent(state, action) {
      switch (action.payload.type) {
        case "name":
          state.name = action.payload.value;
          break;
        case "location":
          state.location = action.payload.value;
          break;
        case "type":
          state.type = action.payload.value;
          break;
        case "fromdate":
          state.date[0] = action.payload.value;
          break;
        case "todate":
          state.date[1] = action.payload.value;
          break;
        default:
          break;
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

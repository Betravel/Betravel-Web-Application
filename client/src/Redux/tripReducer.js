import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = (destinations) => {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:8000/api/event/location", destinations)
      .then((res) => {
        dispatch(tripActions.events(res.data));
      });
  };
};

const initialTripState = {
  user: {
    firstname: "",
    lastname: "",
    phone: 0,
    email: "",
  },
  typeDestination: "uni",
  nbrDestination: 1,
  destinations: [""],
  periode: [new Date(), new Date()],
  nuits: 0,
  nbrPersonnes: 1,
  personnes: [{ firstname: "", lastname: "" }],
  listevents: [],
  events: [],
  options: [],
  status: "processing",
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initialTripState,
  reducers: {
    getUser(state, action) {
      let user = action.payload;
      state.user = user;
    },

    destinations(state, action) {
      state.listdestinations = action.payload;
    },
    events(state, action) {
      state.listevents = action.payload;
    },
    updateevents(state, action) {
      let event = action.payload.value;
      if (action.payload.type === true) {
        state.events.push(event);
      } else {
        for (let index = 0; index < state.events.length; index++) {
          const element = state.events[index];
          if (element._id === event._id) {
            state.events.splice(index, 1);
            index--;
          }
        }
      }
    },
    updateTrip(state, action) {
      switch (action.payload.type) {
        case "typeDestination":
          if (state.nuits <= 1) {
            state.typeDestination = "uni";
          } else {
            state.typeDestination = action.payload.value;
          }
          break;
        case "nbrDestination":
          let nbrDestination = parseInt(action.payload.value);
          let destinations = [];
          if (state.nbrDestination > nbrDestination) {
            for (let index = 0; index < nbrDestination; index++) {
              const element = state.destinations[index];
              destinations.push(element);
            }
          } else {
            destinations = state.destinations;
            let diff = nbrDestination - state.nbrDestination;
            for (let index = 0; index < diff; index++) {
              destinations.push("");
            }
          }
          state.nbrDestination = nbrDestination;
          state.destinations = destinations;
          break;
        case "nbrPersonnes":
          let nbrPersonnes = parseInt(action.payload.value);
          let Personnes = [];
          if (state.nbrPersonnes > nbrPersonnes) {
            for (let index = 0; index < nbrPersonnes; index++) {
              const element = state.personnes[index];
              Personnes.push(element);
            }
          } else {
            Personnes = state.personnes;
            let diff = nbrPersonnes - state.nbrPersonnes;
            for (let index = 0; index < diff; index++) {
              Personnes.push({ firstname: "", lastname: "" });
            }
          }
          state.nbrPersonnes = nbrPersonnes;
          state.personnes = Personnes;
          break;
        default:
          break;
      }
    },
    updatedestinations(state, action) {
      let index = action.payload.index;
      state.destinations[index] = action.payload.value;
    },
    updateperiode(state, action) {
      state.periode = action.payload;
      let nuits = state.periode[1] - state.periode[0];
      state.nuits = nuits / (1000 * 60 * 60 * 24);
    },
    updatepersonnes(state, action) {
      let index = action.payload.index;
      switch (action.payload.type) {
        case "firstname":
          state.personnes[index].firstname = action.payload.value;
          break;
        case "lastname":
          state.personnes[index].lastname = action.payload.value;
          break;
        default:
          break;
      }
    },
    updateoptions(state, action) {
      let status = action.payload.status;
      if (status) {
        state.options.push(action.payload.value);
      } else {
        for (let index = 0; index < state.options.length; index++) {
          const element = state.options[index];
          if (element === action.payload.value) {
            state.options.splice(index, 1);
            index--;
          }
        }
      }
    },

    updateUser(state, action) {
      if (action.payload.type === "firstname") {
        state.user.firstname = action.payload.value;
      } else if (action.payload.type === "lastname") {
        state.user.lastname = action.payload.value;
      } else if (action.payload.type === "phone") {
        state.user.phone = action.payload.value;
      }
    },
  },
});

export const tripActions = tripSlice.actions;
export default tripSlice;

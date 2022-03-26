import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDestinations = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/destinations/all")
      .then((res) => dispatch(searchAction.destinations(res.data)));
  };
};

export function replacesearch(data) {
  return function (dispatch) {
    return dispatch(searchAction.replacesearch(data));
  };
}

const initialSearchState = {
  destination: "init",
  periode: [null, null],
  adulte: 1,
  enfant: 0,
  chambre: 1,
  destinations: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    increment(state, action) {
      state[action.payload.name]++;
    },
    decrement(state, action) {
      state[action.payload.name]--;
    },
    dest(state, action) {
      state.destination = action.payload;
    },
    periode(state, action) {
      state.periode = action.payload;
    },
    destinations(state, action) {
      state.destinations = action.payload;
    },
    replacesearch(state, action) {
      const old = action.payload;
      state.destination = old.destination;
      state.periode = old.periode;
      state.adulte = old.adulte;
      state.enfant = old.enfant;
      state.chambre = old.chambre;
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice;

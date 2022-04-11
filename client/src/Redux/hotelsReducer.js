import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotels = (Destination) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/search/" + Destination)
      .then((res) => {
        dispatch(hotelsActions.gethotels(res.data));
      });
  };
};

const initialHotelsState = [];

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: initialHotelsState,
  reducers: {
    gethotels(state, action) {
      let hotels = action.payload;
      for (let index = 0; index < hotels.length; index++) {
        const element = hotels[index];
        if (!element.price.single) {
          element.price.single = {};
        }
        if (!element.price.double) {
          element.price.double = {};
        }
        if (!element.price.triple) {
          element.price.triple = {};
        }
        if (!element.price.quadruple) {
          element.price.quadruple = {};
        }
        state[index] = element;
      }
    },
  },
});

export const hotelsActions = hotelsSlice.actions;
export default hotelsSlice;

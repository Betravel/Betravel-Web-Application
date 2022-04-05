import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotel = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => dispatch());
  };
};

const initialHotelState = {};

const hotelSlice = createSlice({
  name: "search",
  initialState: initialHotelState,
  reducers: {},
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrices = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => dispatch(roomsAction.addPrices(res.data.price)));
  };
};

const initialRoomsState = {
  prices: {},
  single: { room: [], total: 0 },
  double: { room: [], total: 0 },
  triple: { room: [], total: 0 },
  quadruple: { room: [], total: 0 },
  total: 0,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialRoomsState,
  reducers: {
    addPrices(state, action) {
      state.prices = action.payload;
    },
    changeSingleRooms(state, action) {
      const i = action.payload;
      let rooms = [];
      for (let index = 0; index < i; index++) {
        const element = state.single.room[index];
        rooms.push(element);
      }
      state.single.room = rooms;
    },
  },
});

export const roomsAction = roomsSlice.actions;
export default roomsSlice;

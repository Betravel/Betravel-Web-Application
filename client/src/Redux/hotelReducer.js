import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotel = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => dispatch(hotelActions.getHotel(res.data)));
  };
};

const initialHotelState = {
  name: "",
  rating: 0,
  description: "",
  location: "",
  price: {},
  images: [],
  promo: 0,
  rooms: {},
  options: {},
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialHotelState,
  reducers: {
    getHotel(state, action) {
      let hotel = action.payload;
      state.name = hotel.name;
      state.rating = hotel.rating;
      state.description = hotel.description;
      state.location = hotel.location;
      state.price = hotel.price;
      state.promo = hotel.promo;
      state.images = hotel.images;
      state.rooms = hotel.rooms;
      state.options = hotel.options;
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice;

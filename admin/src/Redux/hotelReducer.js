import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotel = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => dispatch(hotelActions.gethotel(res.data)));
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
  name: "search",
  initialState: initialHotelState,
  reducers: {
    gethotel(state, action) {
      let hotel = action.payload;
      state.hotel.name = hotel.name;
      state.hotel.rating = hotel.rating;
      state.hotel.description = hotel.description;
      state.hotel.location = hotel.location;
      state.hotel.price = hotel.price;
      state.hotel.promo = hotel.promo;
      state.hotel.images = hotel.images;
      state.hotel.rooms = hotel.rooms;
      state.hotel.options = hotel.options;
    },
    updatehotel(state, action) {},
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice;

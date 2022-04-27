import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotelReservation = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationHotel/get/" + id)
      .then((res) =>
        dispatch(hotelreservationsActions.gethotelreservation(res.data))
      );
  };
};

const initialHotelReservationState = {
  id: "",
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
  hotel: {
    name: "",
    rating: 0,
    description: "",
    location: "",
    price: {},
    images: [],
    promo: 0,
    rooms: {},
    options: {
      parking: false,
      wifi: false,
      elevator: false,
      restaurant: false,
      bar: false,
      pool: false,
      indoorpool: false,
      spa: false,
    },
  },
  rooms: [],
  details: {
    single: [],
    double: [],
    triple: [],
    quadruple: [],
  },
  periode: [],
  nuits: "",
  price: 0,
  status: "canceled",
  paiement: "",
};

const hotelReservationSlice = createSlice({
  name: "hotelreservation",
  initialState: initialHotelReservationState,
  reducers: {
    gethotelreservation(state, action) {
      let reservation = action.payload;
      state.id = reservation._id;
      state.user = reservation.user;
      state.hotel = reservation.hotel;
      state.rooms = reservation.rooms;
      state.periode = reservation.periode;
      state.details = reservation.details;
      state.nuits = reservation.nuits;
      state.price = reservation.price;
      state.status = reservation.status;
      state.paiement = reservation.paiement;
    },
  },
});

export const hotelreservationsActions = hotelReservationSlice.actions;

export default hotelReservationSlice;

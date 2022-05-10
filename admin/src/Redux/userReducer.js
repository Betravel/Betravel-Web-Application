import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/user/" + id)
      .then((res) => dispatch(userActions.getuser(res.data)));
  };
};

export const getHotelReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationHotel/getuser/" + id)
      .then((res) => dispatch(userActions.gethotelreservations(res.data)));
  };
};

export const getEventReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationEvent/getuser/" + id)
      .then((res) => dispatch(userActions.geteventreservations(res.data)));
  };
};

const initialUserState = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  createdat: "",
  confirmed: false,
  hotelreservation: [],
  eventreservation: [],
  nbHotelReservations: 0,
  nbEventReservations: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    getuser(state, action) {
      let user = action.payload;
      state.id = user._id;
      state.firstname = user.firstname;
      state.lastname = user.lastname;
      state.email = user.email;
      state.phone = user.phone;
      state.confirmed = user.confirmed;
      state.createdat = user.createdAt;
    },
    gethotelreservations(state, action) {
      let reservations = action.payload;
      state.hotelreservation = reservations;
      state.nbHotelReservations = reservations.length;
    },
    geteventreservations(state, action) {
      let reservations = action.payload;
      state.eventreservation = reservations;
      state.nbEventReservations = reservations.length;
    },
    updateuser(state, action) {
      state[action.payload.type] = action.payload.value;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;

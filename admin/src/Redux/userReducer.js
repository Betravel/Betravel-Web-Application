import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/user/" + id)
      .then((res) => dispatch(userActions.getuser(res.data)));
  };
};

export const getReservations = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservation/get/" + id)
      .then((res) => dispatch(userActions.getreservations(res.data)));
  };
};

const initialUserState = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  createdat: "",
  reservation: [],
  nbReservations: 0,
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
      state.createdat = user.createdAt;
    },
    getreservations(state, action) {
      let reservations = action.payload;
      state.reservation = reservations;
      state.nbReservations = reservations.length;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;

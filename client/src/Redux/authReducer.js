import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuth = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/users/getloggedinuser", {
        withCredentials: true,
      })
      .then((res) => dispatch(authActions.authentified(res.data)))
      .catch((err) => dispatch(authActions.notauthentified()));
  };
};
export const logout = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/logout", {
        withCredentials: true,
      })
      .then((res) => dispatch(authActions.notauthentified()))
      .catch((err) => console.log(err));
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {
    authentified(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    notauthentified(state) {
      state.isAuth = false;
      state.user = {};
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

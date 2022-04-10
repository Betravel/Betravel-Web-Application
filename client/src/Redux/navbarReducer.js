import { createSlice } from "@reduxjs/toolkit";

const initialnavbarState = {
  status: true,
  color: "#21445B",
};

const navbarSlice = createSlice({
  name: "hotels",
  initialState: initialnavbarState,
  reducers: {
    updatenavbar(state, action) {
      if (action.payload) {
        state.status = true;
        state.color = "transparent";
      } else {
        state.status = false;
        state.color = "#21445B";
      }
    },
    updatecolor(state, action) {
      if (state.status) {
        state.color = action.payload;
      } else {
        state.color = "#21445B";
      }
    },
  },
});

export const navbarActions = navbarSlice.actions;
export default navbarSlice;

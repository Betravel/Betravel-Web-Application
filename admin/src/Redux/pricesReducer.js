import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPricesEventReservation = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationEvent/prices")
      .then((res) =>
        dispatch(pricesActions.getpriceseventreservation(res.data))
      );
  };
};

export const getPricesHotelReservation = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/reservationHotel/prices")
      .then((res) =>
        dispatch(pricesActions.getpriceshotelreservation(res.data))
      );
  };
};

const initialPricesState = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Hotels",
      data: [],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Events",
      data: [],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const pricesSlice = createSlice({
  name: "pricesreservation",
  initialState: initialPricesState,
  reducers: {
    getpriceseventreservation(state, action) {
      state.datasets[1].data = action.payload;
    },
    getpriceshotelreservation(state, action) {
      state.datasets[0].data = action.payload;
    },
  },
});

export const pricesActions = pricesSlice.actions;

export default pricesSlice;

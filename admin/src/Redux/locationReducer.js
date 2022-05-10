import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOverviewEventLocation = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/event/location")
      .then((res) =>
        dispatch(overviewlocationActions.getoverviewseventlocation(res.data))
      );
  };
};
export const getOverviewHotelLocation = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/location")
      .then((res) =>
        dispatch(overviewlocationActions.getoverviewhotellocation(res.data))
      );
  };
};

const initialOverviewlocationState = {
  event: {
    labels: [],
    datasets: [
      {
        label: "Events",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  hotel: {
    labels: [],
    datasets: [
      {
        label: "Hotels",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
};

const overviewlocationSlice = createSlice({
  name: "overviewlocation",
  initialState: initialOverviewlocationState,
  reducers: {
    getoverviewseventlocation(state, action) {
      let data = action.payload;
      state.event.labels = data.destinations;
      state.event.datasets[0].data = data.data;
    },
    getoverviewhotellocation(state, action) {
      let data = action.payload;
      state.hotel.labels = data.destinations;
      state.hotel.datasets[0].data = data.data;
    },
  },
});

export const overviewlocationActions = overviewlocationSlice.actions;

export default overviewlocationSlice;

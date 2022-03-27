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
    manageSingleRooms(state, action) {
      const i = action.payload;
      let rooms = state.single.room;
      let updatedrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        for (let index = 0; index < i - rooms.length; index++) {
          updatedrooms.push({ adulte: 1, enfant: 0, pension: "", total: 0 });
        }
      }
      state.single.room = updatedrooms;
      let total = 0;
      for (let index = 0; index < state.single.room.length; index++) {
        const element = state.single.room[index];
        total += element.total;
      }
      state.single.total = total;
    },
    changeSingleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.single.room;
      if (action.payload.type === "adultes") {
        rooms[i].adulte = action.payload.value;
      } else if (action.payload.type === "enfants") {
        rooms[i].enfant = action.payload.value;
      } else if (action.payload.type === "pensions") {
        rooms[i].pension = action.payload.value;
      }
      if (rooms[i].pension !== "") {
        rooms[i].total =
          state.prices.single[rooms[i].pension] * rooms[i].adulte +
          state.prices.kids * rooms[i].enfant;
      }
      state.single.room = rooms;
      let total = 0;
      for (let index = 0; index < state.single.room.length; index++) {
        const element = state.single.room[index];
        total += element.total;
      }
      state.single.total = total;
    },
    manageDoubleRooms(state, action) {
      const i = action.payload;
      let rooms = state.double.room;
      let updatedrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        for (let index = 0; index < i - rooms.length; index++) {
          updatedrooms.push({ adulte: 2, enfant: 0, pension: "", total: 0 });
        }
      }
      state.double.room = updatedrooms;
      let total = 0;
      for (let index = 0; index < state.double.room.length; index++) {
        const element = state.double.room[index];
        total += element.total;
      }
      state.double.total = total;
    },
    changeDoubleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.double.room;
      if (action.payload.type === "adulted") {
        if (action.payload.value === 2) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 1;
        }
      } else if (action.payload.type === "enfantd") {
        if (action.payload.value === 0) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 1;
        }
      } else if (action.payload.type === "pensiond") {
        rooms[i].pension = action.payload.value;
      }
      if (rooms[i].pension !== "") {
        rooms[i].total =
          state.prices.double[rooms[i].pension] * rooms[i].adulte +
          state.prices.kids * rooms[i].enfant;
      }
      state.double.room = rooms;
      let total = 0;
      for (let index = 0; index < state.double.room.length; index++) {
        const element = state.double.room[index];
        total += element.total;
      }
      state.double.total = total;
    },
    manageTripleRooms(state, action) {
      const i = action.payload;
      let rooms = state.triple.room;
      let updatedrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        for (let index = 0; index < i - rooms.length; index++) {
          updatedrooms.push({ adulte: 3, enfant: 0, pension: "", total: 0 });
        }
      }
      state.triple.room = updatedrooms;
      let total = 0;
      for (let index = 0; index < state.triple.room.length; index++) {
        const element = state.triple.room[index];
        total += element.total;
      }
      state.triple.total = total;
    },
    changeTripleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.triple.room;
      if (action.payload.type === "adultet") {
        if (action.payload.value === 3) {
          rooms[i].adulte = 3;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 2) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 1;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 2;
        }
      } else if (action.payload.type === "enfantt") {
        if (action.payload.value === 0) {
          rooms[i].adulte = 3;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 1;
        }
        if (action.payload.value === 2) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 2;
        }
      } else if (action.payload.type === "pensiont") {
        rooms[i].pension = action.payload.value;
      }
      if (rooms[i].pension !== "") {
        rooms[i].total =
          state.prices.triple[rooms[i].pension] * rooms[i].adulte +
          state.prices.kids * rooms[i].enfant;
      }
      state.triple.room = rooms;
      let total = 0;
      for (let index = 0; index < state.triple.room.length; index++) {
        const element = state.triple.room[index];
        total += element.total;
      }
      state.triple.total = total;
    },
    manageQuadrupleRooms(state, action) {
      const i = action.payload;
      let rooms = state.quadruple.room;
      let updatedrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        for (let index = 0; index < i - rooms.length; index++) {
          updatedrooms.push({ adulte: 4, enfant: 0, pension: "", total: 0 });
        }
      }
      state.quadruple.room = updatedrooms;
      let total = 0;
      for (let index = 0; index < state.quadruple.room.length; index++) {
        const element = state.quadruple.room[index];
        total += element.total;
      }
      state.quadruple.total = total;
    },
    changeQuadrupleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.quadruple.room;
      if (action.payload.type === "adulteq") {
        if (action.payload.value === 4) {
          rooms[i].adulte = 4;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 3) {
          rooms[i].adulte = 3;
          rooms[i].enfant = 1;
        }
        if (action.payload.value === 2) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 2;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 3;
        }
      } else if (action.payload.type === "enfantq") {
        if (action.payload.value === 0) {
          rooms[i].adulte = 4;
          rooms[i].enfant = 0;
        }
        if (action.payload.value === 1) {
          rooms[i].adulte = 3;
          rooms[i].enfant = 1;
        }
        if (action.payload.value === 2) {
          rooms[i].adulte = 2;
          rooms[i].enfant = 2;
        }
        if (action.payload.value === 3) {
          rooms[i].adulte = 1;
          rooms[i].enfant = 3;
        }
      } else if (action.payload.type === "pensionq") {
        rooms[i].pension = action.payload.value;
      }
      if (rooms[i].pension !== "") {
        rooms[i].total =
          state.prices.quadruple[rooms[i].pension] * rooms[i].adulte +
          state.prices.kids * rooms[i].enfant;
      }
      state.quadruple.room = rooms;
      let total = 0;
      for (let index = 0; index < state.quadruple.room.length; index++) {
        const element = state.quadruple.room[index];
        total += element.total;
      }
      state.quadruple.total = total;
    },
    getTotal(state) {
      let total = 0;
      total =
        state.single.total +
        state.double.total +
        state.triple.total +
        state.quadruple.total;
      state.total = total;
    },
  },
});

export const roomsAction = roomsSlice.actions;
export default roomsSlice;

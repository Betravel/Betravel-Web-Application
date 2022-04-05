import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHotel = (id) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:8000/api/hotel/" + id)
      .then((res) => dispatch(reservationActions.getHotel(res.data)));
  };
};

export const updateUser = (id, user) => {
  return async function (dispatch) {
    return await axios
      .put("http://localhost:8000/api/user/" + id, user)
      .then((res) => console.log(res));
  };
};

const initialReservationState = {
  hotel: {
    name: "",
    rating: 0,
    description: "",
    location: "",
    price: {},
    images: [],
    promo: 0,
    rooms: {},
    options: {},
  },
  user: {
    firstname: "",
    lastname: "",
    phone: 0,
    email: "",
  },
  rooms: {
    single: { room: [], total: 0 },
    double: { room: [], total: 0 },
    triple: { room: [], total: 0 },
    quadruple: { room: [], total: 0 },
    total: 0,
  },
  details: {
    single: [],
    double: [],
    triple: [],
    quadruple: [],
  },
  periode: [new Date(), new Date()],
  nuits: 0,
  price: 0,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialReservationState,
  reducers: {
    getUser(state, action) {
      let user = action.payload;
      state.user = user;
    },
    getHotel(state, action) {
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
    getPeriode(state, action) {
      let periode = action.payload;
      state.periode = periode;
      let nuits = periode[1] - periode[0];
      state.nuits = nuits / (1000 * 60 * 60 * 24);
    },
    manageSingleRooms(state, action) {
      const i = action.payload;
      let rooms = state.rooms.single.room;
      let details = state.details.single;
      let updatedrooms = [];
      let detailrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
          detailrooms.push({
            adulte: [{ firstname: "", lastname: "" }],
            enfant: [],
          });
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        detailrooms = details;
        let range = i - rooms.length;
        for (let index = 0; index < range; index++) {
          updatedrooms.push({
            adulte: 1,
            enfant: 0,
            pension: "",
            total: 0,
          });
          detailrooms.push({
            adulte: [{ firstname: "", lastname: "" }],
            enfant: [],
          });
        }
      }
      state.rooms.single.room = updatedrooms;
      state.details.single = detailrooms;
    },
    changeSingleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.rooms.single.room;
      if (action.payload.type === "adultes") {
        rooms[i].adulte = action.payload.value;
      } else if (action.payload.type === "enfants") {
        rooms[i].enfant = action.payload.value;
      } else if (action.payload.type === "pensions") {
        rooms[i].pension = action.payload.value;
      }
      if (rooms[i].pension !== "") {
        rooms[i].total =
          state.hotel.price.single[rooms[i].pension] * rooms[i].adulte +
          state.hotel.price.kids * rooms[i].enfant;
      }
      let details = state.details.single;
      let adulte = [];
      let enfant = [];
      for (let index = 0; index < rooms[i].adulte; index++) {
        adulte.push({ firstname: "", lastname: "" });
      }
      for (let index = 0; index < rooms[i].enfant; index++) {
        enfant.push({ firstname: "", lastname: "", age: 0 });
      }
      details[i] = { adulte, enfant };
      state.details.single = details;
      state.rooms.single.room = rooms;
    },
    totalSingle(state) {
      let total = 0;
      for (let index = 0; index < state.rooms.single.room.length; index++) {
        const element = state.rooms.single.room[index];
        total += element.total;
      }
      state.rooms.single.total = total * state.nuits;
    },
    manageDoubleRooms(state, action) {
      const i = action.payload;
      let rooms = state.rooms.double.room;
      let details = state.details.double;
      let updatedrooms = [];
      let detailrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        detailrooms = details;
        let range = i - rooms.length;
        for (let index = 0; index < range; index++) {
          updatedrooms.push({
            adulte: 2,
            enfant: 0,
            pension: "",
            total: 0,
          });
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      }
      state.rooms.double.room = updatedrooms;
      state.details.double = detailrooms;
    },
    changeDoubleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.rooms.double.room;
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
          state.hotel.price.double[rooms[i].pension] * rooms[i].adulte +
          state.hotel.price.kids * rooms[i].enfant;
      }
      let details = state.details.double;
      let adulte = [];
      let enfant = [];
      for (let index = 0; index < rooms[i].adulte; index++) {
        adulte.push({ firstname: "", lastname: "" });
      }
      for (let index = 0; index < rooms[i].enfant; index++) {
        enfant.push({ firstname: "", lastname: "", age: 0 });
      }
      details[i] = { adulte, enfant };
      state.details.double = details;
      state.rooms.double.room = rooms;
    },
    totalDouble(state) {
      let total = 0;
      for (let index = 0; index < state.rooms.double.room.length; index++) {
        const element = state.rooms.double.room[index];
        total += element.total;
      }
      state.rooms.double.total = total * state.nuits;
    },
    manageTripleRooms(state, action) {
      const i = action.payload;
      let rooms = state.rooms.triple.room;
      let details = state.details.triple;
      let updatedrooms = [];
      let detailrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        detailrooms = details;
        let range = i - rooms.length;
        for (let index = 0; index < range; index++) {
          updatedrooms.push({
            adulte: 3,
            enfant: 0,
            pension: "",
            total: 0,
          });
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      }
      state.rooms.triple.room = updatedrooms;
      state.details.triple = detailrooms;
    },
    changeTripleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.rooms.triple.room;
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
          state.hotel.price.triple[rooms[i].pension] * rooms[i].adulte +
          state.hotel.price.kids * rooms[i].enfant;
      }
      let details = state.details.triple;
      let adulte = [];
      let enfant = [];
      for (let index = 0; index < rooms[i].adulte; index++) {
        adulte.push({ firstname: "", lastname: "" });
      }
      for (let index = 0; index < rooms[i].enfant; index++) {
        enfant.push({ firstname: "", lastname: "", age: 0 });
      }
      details[i] = { adulte, enfant };
      state.details.triple = details;
      state.rooms.triple.room = rooms;
    },
    totalTriple(state) {
      let total = 0;
      for (let index = 0; index < state.rooms.triple.room.length; index++) {
        const element = state.rooms.triple.room[index];
        total += element.total;
      }
      state.rooms.triple.total = total * state.nuits;
    },
    manageQuadrupleRooms(state, action) {
      const i = action.payload;
      let rooms = state.rooms.quadruple.room;
      let details = state.details.quadruple;
      let updatedrooms = [];
      let detailrooms = [];
      if (i < rooms.length) {
        for (let index = 0; index < i; index++) {
          const element = rooms[index];
          updatedrooms.push(element);
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      } else if (i > rooms.length) {
        updatedrooms = rooms;
        detailrooms = details;
        let range = i - rooms.length;
        for (let index = 0; index < range; index++) {
          updatedrooms.push({
            adulte: 4,
            enfant: 0,
            pension: "",
            total: 0,
          });
          detailrooms.push({
            adulte: [
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
              { firstname: "", lastname: "" },
            ],
            enfant: [],
          });
        }
      }
      state.rooms.quadruple.room = updatedrooms;
      state.details.quadruple = detailrooms;
    },
    changeQuadrupleRooms(state, action) {
      let i = action.payload.index;
      let rooms = state.rooms.quadruple.room;
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
          state.hotel.price.quadruple[rooms[i].pension] * rooms[i].adulte +
          state.hotel.price.kids * rooms[i].enfant;
      }
      let details = state.details.quadruple;
      let adulte = [];
      let enfant = [];
      for (let index = 0; index < rooms[i].adulte; index++) {
        adulte.push({ firstname: "", lastname: "" });
      }
      for (let index = 0; index < rooms[i].enfant; index++) {
        enfant.push({ firstname: "", lastname: "", age: 0 });
      }
      details[i] = { adulte, enfant };
      state.details.quadruple = details;
      state.rooms.quadruple.room = rooms;
    },
    totalQuadruple(state) {
      let total = 0;
      for (let index = 0; index < state.rooms.quadruple.room.length; index++) {
        const element = state.rooms.quadruple.room[index];
        total += element.total;
      }
      state.rooms.quadruple.total = total * state.nuits;
    },
    getTotal(state) {
      let total = 0;
      total =
        state.rooms.single.total +
        state.rooms.double.total +
        state.rooms.triple.total +
        state.rooms.quadruple.total;
      state.rooms.total = total;
    },
    updateUser(state, action) {
      if (action.payload.type === "firstname") {
        state.user.firstname = action.payload.value;
      } else if (action.payload.type === "lastname") {
        state.user.lastname = action.payload.value;
      } else if (action.payload.type === "phone") {
        state.user.phone = action.payload.value;
      }
    },
    addDetails(state, action) {
      if (action.payload.type === "single") {
        let detail = state.details.single[action.payload.index];
        if (action.payload.champs === "adulte") {
          if (action.payload.name === "firstname") {
            detail.adulte[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.adulte[action.payload.i].lastname = action.payload.value;
          }
        } else if (action.payload.champs === "enfant") {
          if (action.payload.name === "firstname") {
            detail.enfant[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.enfant[action.payload.i].lastname = action.payload.value;
          } else if (action.payload.name === "age") {
            detail.enfant[action.payload.i].age = action.payload.value;
          }
        }
        state.details.single[action.payload.index] = detail;
      } else if (action.payload.type === "double") {
        let detail = state.details.double[action.payload.index];
        if (action.payload.champs === "adulte") {
          if (action.payload.name === "firstname") {
            detail.adulte[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.adulte[action.payload.i].lastname = action.payload.value;
          }
        } else if (action.payload.champs === "enfant") {
          if (action.payload.name === "firstname") {
            detail.enfant[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.enfant[action.payload.i].lastname = action.payload.value;
          } else if (action.payload.name === "age") {
            detail.enfant[action.payload.i].age = action.payload.value;
          }
        }
        state.details.double[action.payload.index] = detail;
      } else if (action.payload.type === "triple") {
        let detail = state.details.triple[action.payload.index];
        if (action.payload.champs === "adulte") {
          if (action.payload.name === "firstname") {
            detail.adulte[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.adulte[action.payload.i].lastname = action.payload.value;
          }
        } else if (action.payload.champs === "enfant") {
          if (action.payload.name === "firstname") {
            detail.enfant[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.enfant[action.payload.i].lastname = action.payload.value;
          } else if (action.payload.name === "age") {
            detail.enfant[action.payload.i].age = action.payload.value;
          }
        }
        state.details.triple[action.payload.index] = detail;
      } else if (action.payload.type === "quadruple") {
        let detail = state.details.quadruple[action.payload.index];
        if (action.payload.champs === "adulte") {
          if (action.payload.name === "firstname") {
            detail.adulte[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.adulte[action.payload.i].lastname = action.payload.value;
          }
        } else if (action.payload.champs === "enfant") {
          if (action.payload.name === "firstname") {
            detail.enfant[action.payload.i].firstname = action.payload.value;
          } else if (action.payload.name === "lastname") {
            detail.enfant[action.payload.i].lastname = action.payload.value;
          } else if (action.payload.name === "age") {
            detail.enfant[action.payload.i].age = action.payload.value;
          }
        }
        state.details.quadruple[action.payload.index] = detail;
      }
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice;

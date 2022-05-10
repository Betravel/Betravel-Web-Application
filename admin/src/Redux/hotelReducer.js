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
  status: {
    single: false,
    singlelpd: false,
    singledp: false,
    singlepc: false,
    singleai: false,
    singlerooms: false,
    double: false,
    doublelpd: false,
    doubledp: false,
    doublepc: false,
    doubleai: false,
    doublerooms: false,
    triple: false,
    triplelpd: false,
    tripledp: false,
    triplepc: false,
    tripleai: false,
    triplerooms: false,
    quadruple: false,
    quadruplelpd: false,
    quadrupledp: false,
    quadruplepc: false,
    quadrupleai: false,
    quadruplerooms: false,
    enfant: false,
    promo: false,
  },
};

const hotelSlice = createSlice({
  name: "search",
  initialState: initialHotelState,
  reducers: {
    gethotel(state, action) {
      let hotel = action.payload;
      state.name = hotel.name;
      state.rating = hotel.rating;
      state.description = hotel.description;
      state.location = hotel.location;
      state.price = hotel.price;
      state.promo = hotel.promo;
      state.images = hotel.images;
      state.rooms = hotel.rooms;
      state.options = hotel.options;
      if (hotel.price.single) {
        state.status.single = true;
        if (hotel.price.single.lpd) {
          state.status.singlelpd = true;
        } else {
          state.price.single.lpd = 0;
        }
        if (hotel.price.single.dp) {
          state.status.singledp = true;
        } else {
          state.price.single.dp = 0;
        }
        if (hotel.price.single.pc) {
          state.status.singlepc = true;
        } else {
          state.price.single.pc = 0;
        }
        if (hotel.price.single.ai) {
          state.status.singleai = true;
        } else {
          state.price.single.ai = 0;
        }
      } else {
        state.price.single = { lpd: 0, dp: 0, pc: 0, ai: 0 };
      }
      if (hotel.price.double) {
        state.status.double = true;
        if (hotel.price.double.lpd) {
          state.status.doublelpd = true;
        } else {
          state.price.double.lpd = 0;
        }
        if (hotel.price.double.dp) {
          state.status.doubledp = true;
        } else {
          state.price.double.dp = 0;
        }
        if (hotel.price.double.pc) {
          state.status.doublepc = true;
        } else {
          state.price.double.pc = 0;
        }
        if (hotel.price.double.ai) {
          state.status.doubleai = true;
        } else {
          state.price.double.ai = 0;
        }
      } else {
        state.price.double = { lpd: 0, dp: 0, pc: 0, ai: 0 };
      }
      if (hotel.price.triple) {
        state.status.triple = true;
        if (hotel.price.triple.lpd) {
          state.status.triplelpd = true;
        } else {
          state.price.triple.lpd = 0;
        }
        if (hotel.price.triple.dp) {
          state.status.tripledp = true;
        } else {
          state.price.triple.dp = 0;
        }
        if (hotel.price.triple.pc) {
          state.status.triplepc = true;
        } else {
          state.price.triple.pc = 0;
        }
        if (hotel.price.triple.ai) {
          state.status.tripleai = true;
        } else {
          state.price.triple.ai = 0;
        }
      } else {
        state.price.triple = { lpd: 0, dp: 0, pc: 0, ai: 0 };
      }
      if (hotel.price.quadruple) {
        state.status.quadruple = true;
        if (hotel.price.quadruple.lpd) {
          state.status.quadruplelpd = true;
        } else {
          state.price.quadruple.lpd = 0;
        }
        if (hotel.price.quadruple.dp) {
          state.status.quadrupledp = true;
        } else {
          state.price.quadruple.dp = 0;
        }
        if (hotel.price.quadruple.pc) {
          state.status.quadruplepc = true;
        } else {
          state.price.quadruple.pc = 0;
        }
        if (hotel.price.quadruple.ai) {
          state.status.quadrupleai = true;
        } else {
          state.price.quadruple.ai = 0;
        }
      } else {
        state.price.quadruple = { lpd: 0, dp: 0, pc: 0, ai: 0 };
      }
      if (hotel.price.kids) {
        state.status.enfant = true;
      } else {
        state.price.kids = 0;
      }
      if (hotel.rooms) {
        if (hotel.rooms.single) {
          state.status.singlerooms = true;
        } else {
          state.rooms.single = 0;
        }
        if (hotel.rooms.double) {
          state.status.doublerooms = true;
        } else {
          state.rooms.double = 0;
        }
        if (hotel.rooms.triple) {
          state.status.triplerooms = true;
        } else {
          state.rooms.triple = 0;
        }
        if (hotel.rooms.quadruple) {
          state.status.quadruplerooms = true;
        } else {
          state.rooms.quadruple = 0;
        }
      } else {
        state.rooms = { single: 0, double: 0, triple: 0, quadruple: 0 };
      }
      if (hotel.promo) {
        state.status.promo = true;
      } else {
        state.promo = 0;
      }
    },
    updatehotel(state, action) {
      state[action.payload.type] = action.payload.value;
    },
    updatelocation(state, action) {
      state.location = action.payload;
    },
    updateoptions(state, action) {
      state.options[action.payload.type] = action.payload.value;
    },
    updatestatus(state, action) {
      state.status[action.payload.type] = action.payload.value;
      if (
        action.payload.type === "single" ||
        action.payload.type === "double" ||
        action.payload.type === "triple" ||
        action.payload.type === "quadruple" ||
        action.payload.type === "kids"
      ) {
        if (!state.price[action.payload.type]) {
          state.price[action.payload.type] = {};
        }
      }
    },
    updateprice(state, action) {
      switch (action.payload.type) {
        case "Singlelpd":
          state.price.single.lpd = action.payload.value;
          break;
        case "Doublelpd":
          state.price.double.lpd = action.payload.value;
          break;
        case "Triplelpd":
          state.price.triple.lpd = action.payload.value;
          break;
        case "Quadruplelpd":
          state.price.quadruple.lpd = action.payload.value;
          break;
        case "Singledp":
          state.price.single.dp = action.payload.value;
          break;
        case "Doubledp":
          state.price.double.dp = action.payload.value;
          break;
        case "Tripledp":
          state.price.triple.dp = action.payload.value;
          break;
        case "Quadrupledp":
          state.price.quadruple.dp = action.payload.value;
          break;
        case "Singlepc":
          state.price.single.pc = action.payload.value;
          break;
        case "Doublepc":
          state.price.double.pc = action.payload.value;
          break;
        case "Triplepc":
          state.price.triple.pc = action.payload.value;
          break;
        case "Quadruplepc":
          state.price.quadruple.pc = action.payload.value;
          break;
        case "Singleai":
          state.price.single.ai = action.payload.value;
          break;
        case "Doubleai":
          state.price.double.ai = action.payload.value;
          break;
        case "Tripleai":
          state.price.triple.ai = action.payload.value;
          break;
        case "Quadrupleai":
          state.price.quadruple.ai = action.payload.value;
          break;
        case "Promo":
          state.promo = action.payload.value;
          break;
        case "Enfant":
          state.price.kids = action.payload.value;
          break;
        default:
          console.log("er");
          break;
      }
    },
    updaterooms(state, action) {
      switch (action.payload.type) {
        case "QuadrupleRooms":
          state.rooms.quadruple = action.payload.value;
          break;
        case "TripleRooms":
          state.rooms.triple = action.payload.value;
          break;
        case "DoubleRooms":
          state.rooms.double = action.payload.value;
          break;
        case "SingleRooms":
          state.rooms.single = action.payload.value;
          break;
        default:
          break;
      }
    },
    clearhotel(state) {
      state.name = "";
      state.rating = 0;
      state.description = "";
      state.location = "";
      state.price = {};
      state.promo = 0;
      state.images = [];
      state.rooms = {};
      state.options = {
        parking: false,
        wifi: false,
        elevator: false,
        restaurant: false,
        bar: false,
        pool: false,
        indoorpool: false,
        spa: false,
      };
      state.status = {
        single: false,
        singlelpd: false,
        singledp: false,
        singlepc: false,
        singleai: false,
        singlerooms: false,
        double: false,
        doublelpd: false,
        doubledp: false,
        doublepc: false,
        doubleai: false,
        doublerooms: false,
        triple: false,
        triplelpd: false,
        tripledp: false,
        triplepc: false,
        tripleai: false,
        triplerooms: false,
        quadruple: false,
        quadruplelpd: false,
        quadrupledp: false,
        quadruplepc: false,
        quadrupleai: false,
        quadruplerooms: false,
        enfant: false,
        promo: false,
      };
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice;

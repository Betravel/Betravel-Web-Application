const mongoose = require("mongoose");

const ReservationHotelSchema = new mongoose.Schema(
  {
    hotel: {
      type: JSON,
    },
    user: {
      type: JSON,
    },
    rooms: {
      type: JSON,
    },
    details: {
      type: JSON,
    },
    periode: {
      type: Array,
    },
    nuits: {
      type: Number,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
    },
    paiement: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ReservationsHotel", ReservationHotelSchema);

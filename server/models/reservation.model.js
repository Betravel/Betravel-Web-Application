const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  hotelid: {
    type: String,
  },
  email: {
    type: String,
  },
  checkin: {
    type: Date,
  },
  checkout: {
    type: Date,
  },
  status: {
    type: String,
  },
  price: {
    type: Number,
  },
  rooms: {
    type: JSON,
  },
  details: {
    type: JSON,
  },
});
module.exports = mongoose.model("Reservations", ReservationSchema);

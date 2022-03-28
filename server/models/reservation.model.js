const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  hotel: {
    type: JSON,
  },
  user: {
    type: JSON,
  },
  rooms: {
    type: JSON,
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
});
module.exports = mongoose.model("Reservations", ReservationSchema);

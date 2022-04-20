const mongoose = require("mongoose");

const ReservationEventSchema = new mongoose.Schema({
  event: {
    type: JSON,
  },
  user: {
    type: JSON,
  },
  reservedplace: {
    type: Number,
  },
  details: {
    type: Array,
  },
  paiement: {
    type: String,
  },
});
module.exports = mongoose.model("ReservationsEvent", ReservationEventSchema);

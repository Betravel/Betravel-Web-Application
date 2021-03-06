const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema(
  {
    user: {
      type: JSON,
    },
    typeDestination: {
      type: String,
    },
    nbrDestination: {
      type: Number,
    },
    destinations: {
      type: Array,
    },
    periode: {
      type: Array,
    },
    nuits: {
      type: Number,
    },
    nbrPersonnes: {
      type: Number,
    },
    personnes: {
      type: Array,
    },
    events: {
      type: Array,
    },
    options: {
      type: Array,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);

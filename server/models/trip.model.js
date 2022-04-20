const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema(
  {
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
    user: {
      type: JSON,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);

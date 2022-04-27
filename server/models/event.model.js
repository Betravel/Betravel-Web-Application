const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: JSON,
    },
    periode: {
      type: Number,
    },
    price: {
      type: Number,
    },
    program: {
      type: Array,
    },
    note: {
      type: Array,
    },
    images: {
      type: Array,
    },
    places: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Events", EventSchema);

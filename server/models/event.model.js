const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
 location : {
    type: String,
  },
  date: {
    type: String,
  },
  hour: {
    type: String,
  },
  periode: {
    type: String,
  },
  price: {
    type: Number,
  },
  program: {
    type: Array,
  },
  note: {
    type: String,
  },

});
module.exports = mongoose.model("Events", EventSchema);

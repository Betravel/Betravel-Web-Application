const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: JSON,
    },
    promo: {
      type: Number,
    },
    images: {
      type: Array,
    },
    imagesurl: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);

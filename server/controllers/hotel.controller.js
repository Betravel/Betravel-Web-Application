const Hotel = require("../models/hotel.model");

module.exports.getAllHotels = (request, response) => {
  Hotel.find({})
    .then((hotels) => response.json(hotels))
    .catch((err) => response.json(err));
};

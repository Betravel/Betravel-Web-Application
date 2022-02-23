const HotelController = require("../controllers/hotel.controller");

module.exports = (app) => {
  app.get("/api/hotels/all", HotelController.getAllHotels);
};

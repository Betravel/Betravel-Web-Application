const HotelController = require("../controllers/controller.hotel");

module.exports = (app) => {
  app.get("/api/hotels/all", HotelController.getAllHotels);
  
};

const TripController = require("../controllers/trip.controller");
module.exports = (app) => {
    app.post("/api/trip/add" , TripController.addTrip )
};
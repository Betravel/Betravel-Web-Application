const TripController = require("../controllers/trip.controller");
module.exports = (app) => {
  app.get("/api/trip/get/:id", TripController.getTripByID);
  app.get("/api/trip/getAll", TripController.getAll);
  app.post("/api/trip/add", TripController.addTrip);
  app.put("/api/trip/confirm/:id", TripController.confirmTrip);
  app.put("/api/trip/cancel/:id", TripController.cancelTrip);
};

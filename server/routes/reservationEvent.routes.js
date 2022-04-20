const ReservationEventController = require("../controllers/reservationEvent.controller");
module.exports = (app) => {
  app.get("/api/reservationEvent/get/:id", ReservationEventController.getReservation);
  app.post("/api/reservationEvent/add", ReservationEventController.addReservation);
  app.get("/api/getreservationEvent/:name", ReservationEventController.getReservedPlacesByEventName);
};

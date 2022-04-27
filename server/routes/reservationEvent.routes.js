const ReservationEventController = require("../controllers/reservationEvent.controller");
module.exports = (app) => {
  app.get("/api/reservationEvent/getall", ReservationEventController.getAll);
  app.get(
    "/api/reservationEvent/getuser/:id",
    ReservationEventController.getReservation
  );
  app.get(
    "/api/reservationEvent/get/:id",
    ReservationEventController.getReservationById
  );
  app.post(
    "/api/reservationEvent/add",
    ReservationEventController.addReservation
  );
  app.get(
    "/api/getreservationEvent/:name",
    ReservationEventController.getReservedPlacesByEventName
  );
  app.put(
    "/api/reservationEvent/confirm/:id",
    ReservationEventController.confirmReservation
  );
  app.put(
    "/api/reservationEvent/cancel/:id",
    ReservationEventController.cancelReservation
  );
};

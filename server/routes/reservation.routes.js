const ReservationController = require("../controllers/reservation.controller");
module.exports = (app) => {
  app.get("/api/reservation/get", ReservationController.getReservation);
  app.post("/api/reservation/add", ReservationController.addReservation);
  app.put(
    "/api/reservation/cancel/:id",
    ReservationController.cancelReservation
  );
};

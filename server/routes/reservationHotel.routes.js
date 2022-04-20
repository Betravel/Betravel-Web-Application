const ReservationHotelController = require("../controllers/reservationHotel.controller");
module.exports = (app) => {
  app.get("/api/reservation/get/:id", ReservationHotelController.getReservation);
  app.post("/api/reservation/add", ReservationHotelController.addReservation);
  app.put(
    "/api/reservation/cancel/:id",
    ReservationHotelController.cancelReservation
  );
};

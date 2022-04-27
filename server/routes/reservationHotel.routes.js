const ReservationHotelController = require("../controllers/reservationHotel.controller");
module.exports = (app) => {
  app.get(
    "/api/reservationHotel/getuser/:id",
    ReservationHotelController.getReservation
  );
  app.get(
    "/api/reservationHotel/get/:id",
    ReservationHotelController.getReservationById
  );
  app.get("/api/reservationHotel/getAll", ReservationHotelController.getAll);
  app.get(
    "/api/reservationHotel/getPromos",
    ReservationHotelController.getPromos
  );
  app.post("/api/reservation/add", ReservationHotelController.addReservation);
  app.put(
    "/api/reservationHotel/confirm/:id",
    ReservationHotelController.confirmReservation
  );
  app.put(
    "/api/reservationHotel/cancel/:id",
    ReservationHotelController.cancelReservation
  );
};

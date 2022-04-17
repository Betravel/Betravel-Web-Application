const Reservation = require("../models/reservationEvent.model");

module.exports.addReservation = (request, response) => {
  const reservation = new Reservation(request.body);
  reservation
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

module.exports.getReservation = (request, response) => {
  Reservation.find()
    .then((res) => {
      let reservations = res;
      let result = [];
      reservations.forEach((reservation) => {
        if (reservation.user._id === request.params.id) {
          result.push(reservation);
        }
      });
      response.json(result);
    })
    .catch((err) => response.json(err));
};

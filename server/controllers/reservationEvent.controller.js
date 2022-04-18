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

module.exports.getReservedPlacesByEventName = (request, response) => {
  Reservation.find()
    .then((res) => {
      let reservations = res;
      let result = [];
      let places = 0;
      reservations.forEach((reservation) => {
        if (reservation.event.name === request.params.name) {
          result.push(reservation);
        }
      });
      result.forEach((element) => {
        places = places + element.reservedplace;
      });
      response.json(places);
    })
    .catch((err) => response.json(err));
};

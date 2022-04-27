const Reservation = require("../models/reservationEvent.model");

module.exports.addReservation = (request, response) => {
  const reservation = new Reservation(request.body);
  reservation
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

module.exports.getAll = (request, response) => {
  Reservation.find()
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

module.exports.getReservationById = (request, response) => {
  Reservation.findById(request.params.id)
    .then((res) => response.json(res))
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

module.exports.getReservedPlacesByEventid = (request, response) => {
  Reservation.find()
    .then((res) => {
      let reservations = res;
      let result = [];
      let places = 0;
      reservations.forEach((reservation) => {
        if (reservation.event._id === request.params.id) {
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

module.exports.confirmReservation = (request, response) => {
  Reservation.findOne({ _id: request.params.id })
    .then((reservation) => {
      reservation.status = "confirmed";
      Reservation.findOneAndUpdate({ _id: request.params.id }, reservation)
        .then((res) => response.json(res))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

module.exports.cancelReservation = (request, response) => {
  Reservation.findOne({ _id: request.params.id })
    .then((reservation) => {
      reservation.status = "canceled";
      Reservation.findOneAndUpdate({ _id: request.params.id }, reservation)
        .then((res) => response.json(res))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

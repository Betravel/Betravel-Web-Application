const Reservation = require("../models/reservationHotel.model");
const Hotel = require("../models/hotel.model");

module.exports.addReservation = (request, response) => {
  const reservation = new Reservation(request.body);
  reservation
    .save()
    .then((res) => response.json(res))
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

module.exports.checkavailability = (request, response) => {
  Reservation.find({ status: "open", hotelid: request.params.id })
    .then((reservations) => {
      let available = {
        single: 0,
        double: 0,
        triple: 0,
      };
      const hotel = Hotel.findById(request.params.id);
      available = hotel.rooms;
      reservations.forEach((res) => {
        if (res.rooms.single) {
          available.single -= res.rooms.single;
        }
        if (res.rooms.double) {
          available.double -= res.rooms.double;
        }
        if (res.rooms.triple) {
          available.triple -= res.rooms.triple;
        }
      });
      response.json(available);
    })
    .catch((err) => response.json(err));
};

module.exports.getPromos = (request, response) => {
  Reservation.find()
    .then((reservations) => {
      let reservation = [];
      reservations.forEach((res) => {
        if (res.hotel.promo !== 0) {
          reservation.push(res);
        }
      });
      response.json(reservation);
    })
    .catch((err) => response.json(err));
};

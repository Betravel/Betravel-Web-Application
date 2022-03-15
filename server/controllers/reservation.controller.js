const Reservation = require("../models/reservation.model");
const Hotel = require("../models/hotel.model");

module.exports.addReservation = (request, response) => {
  const reservation = new Reservation(request.body);
  reservation
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

module.exports.cancelReservation = (request, response) => {
  Reservation.findById(request.params.id)
    .then((reservation) => {
      reservation.status = "cancelled";
      Reservation.findByIdAndUpdate({ _id: request.params.id }, reservation)
        .then((r) => response.json(r))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

module.exports.getReservation = (request, response) => {
  Reservation.find({ email: request.body.email })
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

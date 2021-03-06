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

module.exports.getPrices = (request, response) => {
  Reservation.find({ status: "confirmed" })
    .then((reservations) => {
      let prices = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let today = new Date();
      let year = today.getFullYear();
      reservations.forEach((reservation) => {
        let dt = new Date(reservation.periode[0]);
        if (dt.getFullYear() === year) {
          switch (dt.getMonth()) {
            case 0:
              prices.January += reservation.price;
              break;
            case 1:
              prices.February += reservation.price;
              break;
            case 2:
              prices.March += reservation.price;
              break;
            case 3:
              prices.April += reservation.price;
              break;
            case 4:
              prices.May += reservation.price;
              break;
            case 5:
              prices.June += reservation.price;
              break;
            case 6:
              prices.July += reservation.price;
              break;
            case 7:
              prices.August += reservation.price;
              break;
            case 8:
              prices.September += reservation.price;
              break;
            case 9:
              prices.October += reservation.price;
              break;
            case 10:
              prices.November += reservation.price;
              break;
            case 11:
              prices.December += reservation.price;
              break;
            default:
              break;
          }
        }
      });
      let result = [];
      for (i in prices) {
        result.push(prices[i]);
      }
      response.json(result);
    })
    .catch((err) => response.json(err));
};

module.exports.getOverview = (request, response) => {
  Reservation.find({ status: "confirmed" })
    .then((reservations) => {
      let result = { destinations: [], data: [] };
      let listdestinations = new Set();
      reservations.forEach((reservation) => {
        listdestinations.add(reservation.hotel.location);
      });
      let destinations = [];
      listdestinations.forEach((dest) => {
        destinations.push(dest);
      });
      result.destinations = destinations;
      let data = new Array(destinations.length);
      for (let index = 0; index < destinations.length; index++) {
        const element = destinations[index];
        let i = 0;
        reservations.forEach((reservation) => {
          if (reservation.hotel.location === element) {
            i++;
          }
        });
        data[index] = i;
      }
      result.data = data;
      response.json(result);
    })
    .catch((err) => response.json(err));
};

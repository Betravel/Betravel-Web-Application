const Trip = require("../models/trip.model");

module.exports.addTrip = (request, response) => {
  const trip = new Trip(request.body);
  trip
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

module.exports.getTripByID = (request, response) => {
  Trip.findById(request.params.id)
    .then((result) => response.json(result))
    .catch((err) => response.json(err));
};

module.exports.getAll = (request, response) => {
  Trip.find()
    .then((trips) => response.json(trips))
    .catch((err) => response.json(err));
};

module.exports.confirmTrip = (request, response) => {
  Trip.findOne({ _id: request.params.id })
    .then((reservation) => {
      reservation.status = "confirmed";
      Trip.findOneAndUpdate({ _id: request.params.id }, reservation)
        .then((res) => response.json(res))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

module.exports.cancelTrip = (request, response) => {
  Trip.findOne({ _id: request.params.id })
    .then((reservation) => {
      reservation.status = "canceled";
      Trip.findOneAndUpdate({ _id: request.params.id }, reservation)
        .then((res) => response.json(res))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
};

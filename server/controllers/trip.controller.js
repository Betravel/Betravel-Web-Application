const Trip = require("../models/trip.model");

module.exports.addTrip = (request, response) => {
  const trip = new Trip(request.body);
  trip
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

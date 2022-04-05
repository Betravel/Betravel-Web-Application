const Event = require("../models/event.model");

module.exports.addEvent = (request, response) => {
  const event = new Event(request.body);
  console.log(event);
  event
    .save()
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

module.exports.getAllEvents = (request, response) => {
  Event.find({})
    .then((events) => response.json(events))
    .catch((err) => response.json(err));
};

module.exports.getEventById = (request, response) => {
  Event.findOne({ _id: request.params.id })
    .then((event) => {
      response.json(event);
    })
    .catch((err) => response.json(err));
};

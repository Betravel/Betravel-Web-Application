const Event = require("../models/event.model");
const addimage = require("./image.controller");

module.exports.addEvent = async (request, response) => {
  const event = new Event(request.body);
  console.log(event);
  let urls = [];
  const files = request.files;
  const uploader = async (path) =>
    await addimage.addimage(path, "/BeTravel/hotels/" + hotel._id);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    console.log(newPath);
  }
  event.images = urls;
  event.date = JSON.parse(event.date);
  event.program = JSON.parse(event.program);
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

module.exports.deleteEvent = (request, response) => {
  Event.deleteOne({ _id: request.params.id })
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

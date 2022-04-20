const Event = require("../models/event.model");
const addimage = require("./image.controller");

module.exports.addEvent = async (request, response) => {
  const event = new Event(request.body);
  console.log(event);
  let urls = [];
  const files = request.files;
  const uploader = async (path) =>
    await addimage.addimage(path, "/BeTravel/Events/" + event._id);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    console.log(newPath);
  }
  event.images = urls;
  event.date = JSON.parse(event.date);
  event.date.day = new Date(event.date.day);
  event.date.from = new Date(event.date.from);
  event.date.to = new Date(event.date.to);
  event.program = JSON.parse(event.program);
  for (let index = 0; index < event.program.length; index++) {
    event.program[index].hour = new Date(event.program[index].hour);
  }
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

module.exports.getEventByDestination = (request, response) => {
  let dests = request.body;
  Event.find()
    .then((res) => {
      let events = [];
      res.forEach((event) => {
        for (let index = 0; index < dests.length; index++) {
          const element = dests[index];
          if (event.location === element) {
            events.push(event);
          }
        }
      });
      response.json(events);
    })
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



module.exports.updateEvent = async (request, response) => {
  const updatedevent = request.body;
  const uploader = async (path) =>
    await addimage.addimage(path, "/BeTravel/Events/" + request.params.id);
  let imgs = [];
  const files = request.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { path } = file;
    const newPath = await uploader(path);
    imgs.push(newPath);
  }
  var newimg = [];
  if (updatedevent.images !== "undefined") {
    newimg = JSON.parse(updatedevent.images);
  }
  if (newimg[0] === undefined) {
    newimg = imgs;
  } else {
    imgs.forEach((img) => newimg.push(img));
  }
  updatedevent.images = newimg;
  updatedevent.date = JSON.parse(updatedevent.date);
  updatedevent.date.day = new Date(updatedevent.date.day);
  updatedevent.date.from = new Date(updatedevent.date.from);
  updatedevent.date.to = new Date(updatedevent.date.to);
  updatedevent.program = JSON.parse(updatedevent.program);
  for (let index = 0; index < updatedevent.program.length; index++) {
    updatedevent.program[index].hour = new Date(
      updatedevent.program[index].hour
    );
  }
  Event.findOneAndUpdate({ _id: request.params.id }, updatedevent, {
    new: true,
  })
    .then((result) => {
      response.json(result);
      console.log(result);
    })
    .catch((err) => response.json(err));
};

const Hotel = require("../models/hotel.model");

module.exports.getAllHotels = (request, response) => {
  Hotel.find({})
    .then((hotels) => response.json(hotels))
    .catch((err) => response.json(err));
};

module.exports.getDestinations = (request, response) => {
  Hotel.find({})
    .then((hotels) => {
      var listdestinations = new Set();
      hotels.forEach((hotel) => listdestinations.add(hotel.location));
      response.json({ listdestinations: Array.from(listdestinations) });
    })
    .catch((err) => response.json(err));
};

module.exports.getHotelById = (request, response) => {
  Hotel.findOne({ _id: request.params.id })
    .then((hotel) => {
      response.json(hotel);
    })
    .catch((err) => response.json(err));
};

module.exports.setHotel = (req, res) => {
  const hotel = new Hotel(req.body);
  const url = req.protocol + "://" + req.get("host");
  let imgs = [];
  const files = req.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imgs.push(url + "/public/" + file.filename);
  }
  imgs.forEach((img) => hotel.images.push(img));
  hotel
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

module.exports.updateHotel = (req, res) => {
  const updatedhotel = req.body;
  const url = req.protocol + "://" + req.get("host");
  let imgs = [];
  const files = req.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imgs.push(url + "/public/" + file.filename);
  }
  var newimg = Array(updatedhotel.images);
  if (newimg[0] === undefined) {
    newimg = imgs;
  } else {
    imgs.forEach((img) => newimg.push(img));
  }
  updatedhotel.images = newimg;
  Hotel.findOneAndUpdate({ _id: req.params.id }, updatedhotel, {
    new: true,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
};

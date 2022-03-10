const Hotel = require("../models/hotel.model");
const addimage = require("./image.controller");

module.exports.getAllHotels = (request, response) => {
  Hotel.find({})
    .then((hotels) => response.json(hotels))
    .catch((err) => response.json(err));
};

module.exports.getDestinations = (request, response) => {
  Hotel.find({})
    .then((hotels) => {
      var listdestinations = new Set();
      let res = new Array();
      hotels.forEach((hotel) => listdestinations.add(hotel.location));
      listdestinations.forEach((dest) =>
        res.push({ label: dest, value: dest })
      );
      response.json(res);
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

module.exports.setHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  let urls = [];
  const files = req.files;
  const uploader = async (path) =>
    await addimage.addimage(path, "/hotels/" + hotel._id);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    console.log(newPath);
  }
  hotel.images = urls;
  hotel.price = JSON.parse(hotel.price);
  hotel.options = JSON.parse(hotel.options);
  hotel
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

module.exports.updateHotel = async (req, res) => {
  const updatedhotel = req.body;
  const uploader = async (path) =>
    await addimage.addimage(path, "/hotels/" + req.params.id);
  let imgs = [];
  const files = req.files;
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { path } = file;
    const newPath = await uploader(path);
    imgs.push(newPath);
    console.log(newPath);
  }
  var newimg = Array(updatedhotel.images);
  if (newimg[0] === undefined) {
    newimg = imgs;
  } else {
    imgs.forEach((img) => newimg.push(img));
  }
  updatedhotel.images = newimg;
  updatedhotel.price = JSON.parse(updatedhotel.price);
  updatedhotel.options = JSON.parse(updatedhotel.options);
  Hotel.findOneAndUpdate({ _id: req.params.id }, updatedhotel, {
    new: true,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
};

module.exports.getHotelByLocation = (req, res) => {
  Hotel.find({ location: req.params.location })
    .then((hotel) => res.json(hotel))
    .catch((err) => res.json(err));
};

module.exports.getHotelByPromo = (req, res) => {
  Hotel.find({})
    .then((hotel) => {
      let hotels = [];
      hotel.forEach((h) => {
        if (h.promo !== 0) {
          hotels.push(h);
        }
      });
      res.json(hotels);
    })
    .catch((err) => res.json(err));
};

module.exports.deleteHotel = (request, response) => {
  Hotel.deleteOne({ _id: request.params.id })
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

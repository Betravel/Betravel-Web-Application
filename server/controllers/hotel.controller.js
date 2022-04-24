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
    await addimage.addimage(path, "/BeTravel/hotels/" + hotel._id);
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
  hotel.rooms = JSON.parse(hotel.rooms);

  let prices = new Array();
  if (hotel.price.single) {
    if (hotel.price.single.lpd) {
      prices.push(hotel.price.single.lpd);
    }
    if (hotel.price.single.dp) {
      prices.push(hotel.price.single.dp);
    }
    if (hotel.price.single.pc) {
      prices.push(hotel.price.single.pc);
    }
    if (hotel.price.single.ai) {
      prices.push(hotel.price.single.ai);
    }
  }
  if (hotel.price.double) {
    if (hotel.price.double.lpd) {
      prices.push(hotel.price.double.lpd);
    }
    if (hotel.price.double.dp) {
      prices.push(hotel.price.double.dp);
    }
    if (hotel.price.double.pc) {
      prices.push(hotel.price.double.pc);
    }
    if (hotel.price.double.ai) {
      prices.push(hotel.price.double.ai);
    }
  }
  if (hotel.price.triple) {
    if (hotel.price.triple.lpd) {
      prices.push(hotel.price.triple.lpd);
    }
    if (hotel.price.triple.dp) {
      prices.push(hotel.price.triple.dp);
    }
    if (hotel.price.triple.pc) {
      prices.push(hotel.price.triple.pc);
    }
    if (hotel.price.triple.ai) {
      prices.push(hotel.price.triple.ai);
    }
  }
  if (hotel.price.quadruple) {
    if (hotel.price.quadruple.lpd) {
      prices.push(hotel.price.quadruple.lpd);
    }
    if (hotel.price.quadruple.dp) {
      prices.push(hotel.price.quadruple.dp);
    }
    if (hotel.price.quadruple.pc) {
      prices.push(hotel.price.quadruple.pc);
    }
    if (hotel.price.quadruple.ai) {
      prices.push(hotel.price.quadruple.ai);
    }
  }
  prices.sort((a, b) => a - b);

  hotel.price.best = prices[0];

  hotel
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

module.exports.updateHotel = async (req, res) => {
  const updatedhotel = req.body;
  const uploader = async (path) =>
    await addimage.addimage(path, "/BeTravel/hotels/" + req.params.id);
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
  var newimg = JSON.parse(updatedhotel.images);
  if (newimg[0] === undefined) {
    newimg = imgs;
  } else {
    imgs.forEach((img) => newimg.push(img));
  }
  updatedhotel.images = newimg;
  updatedhotel.price = JSON.parse(updatedhotel.price);
  updatedhotel.rooms = JSON.parse(updatedhotel.rooms);
  let prices = new Array();
  if (updatedhotel.price.single) {
    if (updatedhotel.price.single.lpd) {
      prices.push(updatedhotel.price.single.lpd);
    }
    if (updatedhotel.price.single.dp) {
      prices.push(updatedhotel.price.single.dp);
    }
    if (updatedhotel.price.single.pc) {
      prices.push(updatedhotel.price.single.pc);
    }
    if (updatedhotel.price.single.ai) {
      prices.push(updatedhotel.price.single.ai);
    }
  }
  if (updatedhotel.price.double) {
    if (updatedhotel.price.double.lpd) {
      prices.push(updatedhotel.price.double.lpd);
    }
    if (updatedhotel.price.double.dp) {
      prices.push(updatedhotel.price.double.dp);
    }
    if (updatedhotel.price.double.pc) {
      prices.push(updatedhotel.price.double.pc);
    }
    if (updatedhotel.price.double.ai) {
      prices.push(updatedhotel.price.double.ai);
    }
  }
  if (updatedhotel.price.triple) {
    if (updatedhotel.price.triple.lpd) {
      prices.push(updatedhotel.price.triple.lpd);
    }
    if (updatedhotel.price.triple.dp) {
      prices.push(updatedhotel.price.triple.dp);
    }
    if (updatedhotel.price.triple.pc) {
      prices.push(updatedhotel.price.triple.pc);
    }
    if (updatedhotel.price.triple.ai) {
      prices.push(updatedhotel.price.triple.ai);
    }
  }
  if (updatedhotel.price.quadruple) {
    if (updatedhotel.price.quadruple.lpd) {
      prices.push(updatedhotel.price.quadruple.lpd);
    }
    if (updatedhotel.price.quadruple.dp) {
      prices.push(updatedhotel.price.quadruple.dp);
    }
    if (updatedhotel.price.quadruple.pc) {
      prices.push(updatedhotel.price.quadruple.pc);
    }
    if (updatedhotel.price.quadruple.ai) {
      prices.push(updatedhotel.price.quadruple.ai);
    }
  }
  prices.sort((a, b) => a - b);

  updatedhotel.price.best = prices[0];
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
    .then((hotels) => {
      let sorted = [];
      sorted = hotels.sort(function (a, b) {
        return a.price.best - b.price.best;
      });
      res.json(sorted);
    })
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

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
  if (hotel.price.lp) {
    if (hotel.price.lp.triple) {
      prices.push(hotel.price.lp.triple);
    }
    if (hotel.price.lp.double) {
      prices.push(hotel.price.lp.double);
    }
    if (hotel.price.lp.single) {
      prices.push(hotel.price.lp.single);
    }
  }
  if (hotel.price.dp) {
    if (hotel.price.dp.triple) {
      prices.push(hotel.price.dp.triple);
    }
    if (hotel.price.dp.double) {
      prices.push(hotel.price.dp.double);
    }
    if (hotel.price.dp.single) {
      prices.push(hotel.price.dp.single);
    }
  }
  if (hotel.price.pc) {
    if (hotel.price.pc.triple) {
      prices.push(hotel.price.pc.triple);
    }
    if (hotel.price.pc.double) {
      prices.push(hotel.price.pc.double);
    }
    if (hotel.price.pc.single) {
      prices.push(hotel.price.pc.single);
    }
  }
  if (hotel.price.ai) {
    if (hotel.price.ai.triple) {
      prices.push(hotel.price.ai.triple);
    }
    if (hotel.price.ai.double) {
      prices.push(hotel.price.ai.double);
    }
    if (hotel.price.ai.single) {
      prices.push(hotel.price.ai.single);
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
  if (updatedhotel.price.lp) {
    if (updatedhotel.price.lp.triple) {
      prices.push(updatedhotel.price.lp.triple);
    }
    if (updatedhotel.price.lp.double) {
      prices.push(updatedhotel.price.lp.double);
    }
    if (updatedhotel.price.lp.single) {
      prices.push(updatedhotel.price.lp.single);
    }
  }
  if (updatedhotel.price.dp) {
    if (updatedhotel.price.dp.triple) {
      prices.push(updatedhotel.price.dp.triple);
    }
    if (updatedhotel.price.dp.double) {
      prices.push(updatedhotel.price.dp.double);
    }
    if (updatedhotel.price.dp.single) {
      prices.push(updatedhotel.price.dp.single);
    }
  }
  if (updatedhotel.price.pc) {
    if (updatedhotel.price.pc.triple) {
      prices.push(updatedhotel.price.pc.triple);
    }
    if (updatedhotel.price.pc.double) {
      prices.push(updatedhotel.price.pc.double);
    }
    if (updatedhotel.price.pc.single) {
      prices.push(updatedhotel.price.pc.single);
    }
  }
  if (updatedhotel.price.ai) {
    if (updatedhotel.price.ai.triple) {
      prices.push(updatedhotel.price.ai.triple);
    }
    if (updatedhotel.price.ai.double) {
      prices.push(updatedhotel.price.ai.double);
    }
    if (updatedhotel.price.ai.single) {
      prices.push(updatedhotel.price.ai.single);
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
    .then((hotels) => res.json(hotels))
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

module.exports.getprices = (request, response) => {
  Hotel.findById(request.params.id)
    .then((hotel) => {
      console.log(request.body);
      const rooms = request.body;
      const hprice = hotel.price;
      let prices = {};
      if (rooms.single) {
        let single = rooms.single;
        let totalsingle = 0;
        for (let index = 0; index < single.length; index++) {
          const element = single[index];
          let singleprice =
            element.adulte * hprice.single[element.pension] +
            element.enfant * hprice.kids;
          totalsingle = totalsingle + singleprice;
          single[index].total = singleprice;
        }
        prices.single = single;
        prices.totalsingle = totalsingle;
      }
      if (rooms.double) {
        let double = rooms.double;
        let totaldouble = 0;
        for (let index = 0; index < double.length; index++) {
          const element = double[index];
          let doubleprice =
            element.adulte * hprice.double[element.pension] +
            element.enfant * hprice.kids;
          totaldouble = totaldouble + doubleprice;
          double[index].total = doubleprice;
        }
        prices.double = double;
        prices.totaldouble = totaldouble;
      }
      if (rooms.triple) {
        let triple = rooms.triple;
        let totaltriple = 0;
        for (let index = 0; index < triple.length; index++) {
          const element = triple[index];
          let tripleprice =
            element.adulte * hprice.triple[element.pension] +
            element.enfant * hprice.kids;
          totaltriple = totaltriple + tripleprice;
          triple[index].total = tripleprice;
        }
        prices.triple = triple;
        prices.totaltriple = totaltriple;
      }
      response.json(prices);
    })
    .catch((err) => response.json(err));
};

module.exports.checkrooms = (request, response) => {
  let initialrooms = request.body;
  let room = [];
  if (initialrooms.single) {
    let single = initialrooms.single;
    for (let index = 0; index < single.length; index++) {
      const element = single[index];
      if (element.adulte !== 1) {
        element.adulte = 1;
      }
      if (element.enfant !== 0) {
        element.enfant = 0;
      }
      room.push(element);
    }
  }
  if (initialrooms.double) {
    let double = initialrooms.double;
    for (let index = 0; index < double.length; index++) {
      const element = double[index];
      if (element.adulte === 2) {
        element.enfant = 0;
      } else if (element.adulte === 1) {
        element.enfant = 1;
      } else if (element.adulte === 0) {
        element.adulte = 1;
        element.enfant = 1;
      } else {
        element.adulte = 2;
        element.enfant = 0;
      }
      room.push(element);
    }
  }
  if (initialrooms.triple) {
    let triple = initialrooms.triple;
    for (let index = 0; index < triple.length; index++) {
      const element = triple[index];
      if (element.adulte === 3) {
        element.enfant = 0;
      } else if (element.adulte === 2) {
        element.enfant = 1;
      } else if (element.adulte === 1) {
        element.enfant = 2;
      } else if (element.adulte === 0) {
        element.adulte = 1;
        triple[index].enfant = 2;
      } else {
        element.adulte = 3;
        element.enfant = 0;
      }
      room.push(element);
    }
  }
  response.json(room);
};

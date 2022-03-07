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
  const url = req.protocol + "://" + req.get("host");
  let imgs = [];
  let urls = [];
  const files = req.files;
  const uploader = async (path) => await addimage.addimage(path, "");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imgs.push(url + "/public/" + file.filename);
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    // var oldpath = file.path;
    // cloudinary.uploader.upload(oldpath).then((result) => {
    //   let u = {};
    //   for (var attributename in result) {
    //     if (attributename == "public_id") {
    //       u.publicid = result[attributename];
    //     }
    //     if (attributename == "url") {
    //       u.iurl = result[attributename];
    //     }
    //   }
    //   urls.push(u);
    // });
    console.log(newPath);
  }

  imgs.forEach((img) => hotel.images.push(img));
  hotel.imagesurl = urls;
  hotel.price = JSON.parse(hotel.price);
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

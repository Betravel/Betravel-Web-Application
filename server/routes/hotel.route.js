const HotelController = require("../controllers/hotel.controller");
const multer = require("multer");


const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");

    cb(null, fileName);

  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = (app) => {
  app.get("/api/hotels/all", HotelController.getAllHotels);
  app.get("/api/destinations/all", HotelController.getDestinations);
  app.get("/api/hotel/:id", HotelController.getHotelById);
  app.post("/api/hotel", upload.array("images"), HotelController.setHotel);
  app.put(
    "/api/hotel/update/:id",
    upload.array("images"),
    HotelController.updateHotel
  );
};

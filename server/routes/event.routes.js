const EventController = require("../controllers/event.controller");
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
  app.post("/api/event/add", upload.array("images"), EventController.addEvent);
  app.get("/api/event/all", EventController.getAllEvents);
  app.get("/api/event/new", EventController.getNewEvents);
  app.post("/api/event/location", EventController.getEventByDestination);
  app.get("/api/event/:id", EventController.getEventById);
  app.put(
    "/api/event/update/:id",
    upload.array("images"),
    EventController.updateEvent
  );
  app.delete("/api/event/delete/:id", EventController.deleteEvent);
};

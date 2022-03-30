const EventController = require("../controllers/event.controller");
module.exports = (app) => {
  app.post("/api/event/add", EventController.addEvent);
  app.get("/api/event/all", EventController.getAllEvents);
  app.get("/api/event/:id", EventController.getEventById);
};

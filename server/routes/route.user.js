const UserController = require("../controllers/controller.user");

module.exports = function (app) {
  app.get("/api", UserController.index);
  app.post("/api/register", UserController.register);
  //app.post("/api/user", UserController.createUser);
  //app.get("/api/user", UserController.getAllUser);
};

const UserController = require("../controllers/controller.user");
const EmailController = require("../controllers/controller.sendmail");
const HotelController = require("../controllers/controller.hotel");
const { authenticate } = require("../config/jwt");
module.exports = (app) => {
  //user
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get(
    "/api/users/getloggedinuser",
    authenticate,
    UserController.getLoggedInUser
  );
  app.get("/api/users/all",UserController.getAllPeople);
  app.get("/api/user/:id", UserController.getUserById);
  app.get("/api/users/:email", UserController.getUserByEmail);
  app.put("/api/user/:id", UserController.updateUser);
  app.put("/api/user/update", UserController.updateUserPassword);
  app.post("/send", EmailController.sendmail);

  //hotel
  app.get("/api/hotels",HotelController.getAllHotels );
};

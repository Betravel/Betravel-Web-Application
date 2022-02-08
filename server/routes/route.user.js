const UserController = require("../controllers/controller.user");
const { authenticate } = require("../config/jwt");

module.exports = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get(
    "/api/users/getloggedinuser",
    authenticate,
    UserController.getLoggedInUser
  );
  app.get("/api/user/:id", UserController.getUserById);
  app.put("/api/user/:id",  UserController.updateUser);
}
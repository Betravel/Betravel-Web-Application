const UserController = require("../controllers/controller.user");
const EmailController = require("../controllers/controller.sendmail");
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
  app.get("/api/users/:email", UserController.getUserByEmail);
  app.put("/api/user/:id", UserController.updateUser);
  app.post("/send", EmailController.sendmail);
};

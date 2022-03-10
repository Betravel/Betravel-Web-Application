const EmailController = require("../controllers/sendmail.controller");
module.exports = (app) => {
  app.post("/send", EmailController.sendmail);
};

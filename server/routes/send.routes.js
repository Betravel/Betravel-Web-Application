const EmailController = require("../controllers/sendmail.controller");
module.exports = (app) => {
  app.post("/account", EmailController.AccountMails);
  app.post(
    "/reservationdetails/hotel",
    EmailController.HotelReservationDetails
  );
  app.post(
    "/reservationdetails/event",
    EmailController.EventReservationDetails
  );
  app.post("/contact", EmailController.Contact);
};

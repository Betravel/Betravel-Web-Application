const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");
var nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

/// welcoming email par default using ejs ( HTML template)
module.exports.sendmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.PASSWORD_ACCOUNT,
    },
  });

  User.findOne({ email: req.body.email })
    .then((user) => {
      var file = "";
      var paths = "";
      var topic = "";
      if (req.body.type === "welcome") {
        file = "../views/welcome.ejs";
        paths = "confirmed";
        topic = "Welcome to BeTravel";
      } else if (req.body.type === "reset") {
        file = "../views/reset.ejs";
        paths = "Confirmpass";
        topic = "Reset Password";
      }
      ejs
        .renderFile(path.join(__dirname, file), {
          name: user.firstname + " " + user.lastname,
          link: "http://localhost:3000/" + paths + "/" + user._id.toString(),
        })
        .then((resultat) => {
          var mailOptions = {
            from: "testb8835@gmail.com",
            to: req.body.email,
            subject: topic,
            html: resultat,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).send({ msg: "email sent" });
            }
          });
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
};

module.exports.ReservationDetailsEmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.PASSWORD_ACCOUNT,
    },
  });

  Reservation.findOne({ _id: req.body.id })
    .then((reservation) => {
      let details = "";
      let d = reservation.details;
      console.log(Object.keys(d).length);
      for (key in d) {
        const element = d[key];
        console.log(element);
        if (element.length > 0) {
          details += element.length + " " + key + " room(s) \n";
        }
      }
      console.log(details);

      ejs
        .renderFile(path.join(__dirname, "../views/confirmEmail.ejs"), {
          hotel: reservation.hotel,
          details,
          price: reservation.price,
          // periode: reservation.periode,
        })
        .then((resultat) => {
          console.log("okkkkkk");
          var mailOptions = {
            from: "testb8835@gmail.com",
            to: req.body.email,
            subject: "Reservation",
            html: resultat,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).send({ msg: "email sent" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

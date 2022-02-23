const User = require("../models/user.model");
var nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

/// welcoming email par default using ejs ( HTML template)
module.exports.sendmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testb8835@gmail.com",
      pass: "Blabla123",
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

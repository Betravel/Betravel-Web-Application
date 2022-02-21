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
      ejs
        .renderFile(path.join(__dirname, "../views/welcome.ejs"))
        .then((resultat) => {
          var mailOptions = {
            from: "testb8835@gmail.com",
            to: req.body.email,
            subject: "BN NUIT 😘",
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

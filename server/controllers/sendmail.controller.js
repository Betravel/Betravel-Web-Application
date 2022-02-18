const User = require("../models/user.model");
var nodemailer = require("nodemailer");

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
      var mailOptions = {
        from: "testb8835@gmail.com",
        to: req.body.email,
        subject: req.body.sjt,
        html: req.body.msg,
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
};

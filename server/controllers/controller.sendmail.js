var nodemailer = require("nodemailer");
const User = require("../models/model.user");

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
      console.log(user._id.toString());

      var mailOptions = {
        from: "testb8835@gmail.com",
        to: req.body.email,
        subject: "Sending Email using Node.js",
        // text: "That was easy!",
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

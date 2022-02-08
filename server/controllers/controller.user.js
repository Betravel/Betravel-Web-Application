const User = require("../models/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports.register = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res
        .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
          httpOnly: true,
        })
        .json({ msg: "success", user: user });
    })
    .catch((err) => res.json(err));
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        res.json({ msg: "Invalid login attempt" }); //email is not found
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((passwordIsValid) => {
            if (passwordIsValid) {
              res
                .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
                  httpOnly: true,
                })
                .json({ msg: "success!" });
            } else {
              res.json({ msg: "Invalid login attempt" }); //incorrect password
            }
          })
          .catch((err) => res.json({ msg: "Invalid login attempt", err }));
      }
    })
    .catch((err) => res.json(err));
};

module.exports.getLoggedInUser = (req, res) => {
  const decodedJWT = jwt.decode(req.cookies.usertoken , { complete: true });
  User.findById(decodedJWT.payload._id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.getUserById = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getAllPeople = (request, response) => {
  User.find({})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.json(err));
};

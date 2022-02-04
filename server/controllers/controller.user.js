const User = require("../models/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports.index = (request, response) => {
  response.json({
    message: " Welcome to BeTravel",
  });
};

module.exports.register = (req, res) => {
  const user = new User(req.body);
  console.log(user);
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

/*
module.exports.createUser = (request, response) => {
  const { username, email, password } = request.body;
  User.create({
    username,
    email,
    password,
  })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getAllUser = (request, response) => {
  User.find({})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};*/

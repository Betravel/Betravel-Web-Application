const User = require("../models/user.model");

module.exports.getUserById = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

module.exports.getUserByEmail = (request, response) => {
  User.findOne({ email: request.params.email })
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



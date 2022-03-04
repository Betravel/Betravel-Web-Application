const cloudinary = require("../config/cloudinary.config");
const Image = require("../models/image.model");

module.exports = (app) => {
  app.post("/images", async (req, res) => {
    try {
      // Upload image to cloudinary
      const i = req.files[0].path;
      const result = await cloudinary.uploader.upload(i);
      // Create new user
      let user = new Image({
        name: req.body.name,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // save user details in mongodb
      await user.save();
      res.status(200).send({
        user,
      });
    } catch (err) {
      console.log(err);
    }
  });
};

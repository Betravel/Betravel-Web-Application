const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  name: String,
  profile_img: String,
  cloudinary_id: String,
});
module.exports = mongoose.model("Image", imageSchema);

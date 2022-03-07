const cloudinary = require("../config/cloudinary.config");

module.exports.addimage = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        ressource_type: "auto",
        folder: folder,
      }
    );
  });
};

const multer = require("multer");
const sharp = require("sharp");
path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, name + "_" + Date.now() + ".webp");
  },
});

const upload = multer({ storage: storage }).single("image");

// Redimensionn des images

const resizeImage = (req, res, next) => {
  if (req.file) {
    const filePath = req.file.path;
    const output = path.join("images", `resize_${req.file.filename}`);
    sharp(filePath)
      .resize({
        width: 206,
        height: 260,
        fit: "fill",
      })
      .webp()
      .toFile(output)
      .then(() => {
        //delete older file, keep the resized one
        fs.unlink(filePath, () => {
          req.file.path = output;
          next();
        });
      })
      .catch((err) => next(err));
  } else {
    return next();
  }
};

module.exports = [upload, resizeImage];

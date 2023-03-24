const multer = require("multer");

module.exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

module.exports.fileFilter = (req, file, cb) => {
  if (file.mimtype === "image/png" || file.mimtype === "image/jpeg")
    return cb(null, true);
  cb(null, false);
};

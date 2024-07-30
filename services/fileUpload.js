const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../public/images/products");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    //imagen-xxxcodigoxxx.jpeg
    const randomString = crypto.randomBytes(8).toString("hex");
    const extention = path.extname(file.originalname);
    const poster = "imagen-" + randomString + extention;
    cb(null, poster);
  },
});

const fileUpload = multer({ storage });

module.exports = fileUpload;

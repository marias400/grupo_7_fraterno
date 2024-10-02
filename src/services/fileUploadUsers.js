const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../public/images/users");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    //imagen-xxxcodigoxxx.jpeg
    const randomString = crypto.randomBytes(8).toString("hex");
    const extention = path.extname(file.originalname);
    const product = "imagen-" + randomString + extention;
    cb(null, product);
  },
});

const fileUploadUsers = multer({ storage });

module.exports = fileUploadUsers;

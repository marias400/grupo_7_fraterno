const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../../public/images/products");
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

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({ storage, fileFilter });

module.exports = fileUpload;

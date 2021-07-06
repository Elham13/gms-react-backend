const path = require("path");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname.split(".")[0]}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "gms-ads",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${file.originalname.split(".")[0]}-${Date.now()}${path.extname(
          file.originalname
        )}`
      );
    },
  }),
});

// process.env.NODE_ENV === "development"

router.post("/", uploadS3.array("images", 5), (req, res) => {
  const reqFiles = [];
  // const url = req.protocol + "://" + req.get("host");
  // console.log(url);
  // console.log(req.files);

  req.files.forEach((file) => {
    reqFiles.push(file.location);
  });
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(url + "/uploads/" + req.files[i].filename);
  // }
  res.send(reqFiles);
});

router.post("/single", uploadS3.single("image"), (req, res) => {
  const fileName = req.file.location;
  res.status(201).send(fileName);
});

module.exports = router;

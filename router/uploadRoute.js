const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

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

router.post("/", upload.array("images", 5), (req, res) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  // console.log(url);
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/uploads/" + req.files[i].filename);
  }
  res.send(reqFiles);
});

router.post("/single", upload.single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const fileName = url + "/uploads/" + req.file.filename;
  res.status(201).send(fileName);
});

module.exports = router;

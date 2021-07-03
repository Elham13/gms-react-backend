require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const flash = require("express-flash");
const bcrypt = require("bcryptjs");
const methodOverride = require("method-override");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");

const router = require("./router/router");
const uploadRoutes = require("./router/uploadRoute");
const connectDb = require("./config/db");

const createAdmin = async (email1, password1) => {
  const hash = bcrypt.hashSync(password1, 10);

  const newUser = {
    fullName: "Elhamuddin Mahmooid",
    email: email1,
    password: hash,
    role: "admin",
  };
  const User = require("./models/users");
  const ad = new User(newUser);
  await ad.save();
};
// createAdmin('wolverine.elham@gmail.com', '123456');

const app = express();
connectDb();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(expressFileUpload());

// Express
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static("uploads"));

// Method ovverride
app.use(methodOverride("_method"));

// Express Session
app.use(
  expressSession({
    secret: "top_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Express flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(router);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));

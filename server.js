require("dotenv").config();
const express = require('express')
const passport = require('passport') 
const expressSession = require("express-session");
const flash = require("express-flash");
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const cors = require('cors');

const router = require('./router/router')
const connectDb = require('./config/db')
const initializePassport = require('./config/passport-config'); 

const createAdmin = async (email1, password1) => {
    const hash = bcrypt.hashSync(password1, 10);

    const newUser = {
        fullName: 'Elhamuddin Mahmooid',
        email: email1,
        password: hash,
        role: "admin"
    }
    const User = require('./models/users');
    const ad = new User(newUser);
    await ad.save()
}
// createAdmin('wolverine.elham@gmail.com', '123456');

const app = express()
connectDb()

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
  
app.use(cors(corsOptions));

// Express
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended: true, limit: "50mb" }));

// Method ovverride
app.use(methodOverride('_method'));

// passport 
initializePassport(passport);

// Express Session
app.use(
    expressSession({
        secret: "top_secret",
        resave: false,
        saveUninitialized: false,
    })
);

// Passport midleware
app.use(passport.initialize());
app.use(passport.session());

// Express flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});



app.use(router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at ${PORT}`)) 
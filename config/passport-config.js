const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;

// Load User model
const User = require("../models/users"); 

const initializePassport = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    // console.log('From passport: ', email, passport)
    const user = await User.findOne({ email: email }, (err, result) => { 
      if (err) return done(err);
      if (!result) return done(null, false, {message: "No user with that Email"});
    });

    const passwordMatched = bcrypt.compareSync(password, user.password); 
    return passwordMatched ? done(null, user) : done(null, false, {message: "Password is incorrect"}); 
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => { return done(null, user.id) });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initializePassport;
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;

// Load User model
const AdminsModal = require("../models/admins");

const initializePassport = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    const admin = await AdminsModal.findOne({ email: email }, (err, result) => {
      if (err) return done(err);
      if (!result) return done(null, false, {message: "No user with that Email"});
    });

    const passwordMatched = bcrypt.compareSync(password, admin.password); 
    return passwordMatched ? done(null, admin) : done(null, false, {message: "Password is incorrect"}); 
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => { return done(null, user.id) });
  passport.deserializeUser((id, done) => {
    AdminsModal.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initializePassport;
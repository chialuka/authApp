const User = require("../database/models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken")
require("dotenv").config();

const opts = {};

opts.secretOrKey = process.env.secret;

module.exports = {
  local: passport.use(
    new LocalStrategy( function(username, password, cb) {
      console.log(username, password)
      User.findOne({ name: username }).then(user => {
        if (!user) {
          return cb(null, false);
        }
        console.log(user)
        return cb(null, user)
      })
      .catch(err => {
        return cb(err)
      })
    })
  ),
  google: passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
      },
      function(accessToken, refreshToken, profile, cb) {
        process.nextTick(() => {
          User.findOne({ googleId: profile.id }).then(user => {
            if (user) {
              return cb(null, user);
            } else {
              const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value
              });
              newUser
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    name: user.name
                  };
                  const token = jwt.sign(payload, process.env.secret, { expiresIn: "1h" });
                  user.token = token;
                  cb(null, user);
                })
                .catch(err => console.log(err));
            }
          });
        });
      }
    )
  )
};

passport.serializeUser(function(user, cb) {
  return cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

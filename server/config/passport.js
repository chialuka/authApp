const Users = require("../database/models/user");
const User = Users.User;
const GoogleUser = Users.GoogleUser;
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = {
  passportJWT: passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  ),
  google: passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:7000/api/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        process.nextTick(() => {
          User.findOne({ googleId: profile.id }).then(user => {
            if (user) {
              return cb(null, user);
            } else {
              const newUser = new GoogleUser({
                name: profile.displayName,
                email: profile.emails[0].value
              });
              newUser
                .save()
                .then(user => {
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

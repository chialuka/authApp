const Users = require("../database/models/user");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config()

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = {
  passportJWT: passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Users.findOne({ id: jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })),
  google: passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.secret,
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function(err, user) {
      return cb(err, user)
    })
  }))
}
const express = require("express");
const router = express.Router();
const User = require("./../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const methods = require("../config/passport");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

const googleMethod = methods.google;
const google = googleMethod._strategies.google.name;
const localMethod = methods.local;
const local = localMethod._strategies.local.name
console.log(local)

require("dotenv").config();
const key = process.env.secret;

const validateRegistration = require("../validator/register");
const validateLogin = require("../validator/login");

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.hash(newUser.password, 12).then(function(hash) {
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            const payload = {
              id: user.id,
              name: user.name
            };
          })
          .catch(err => console.log(err));
      });
      passport.authenticate(local, (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/home`);
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ email: "Email not registered. Do you mean to sign up?" });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        console.log("we have a match")
        passport.authenticate(local, (req, res) => {
          console.log(req, res, "correct")
          res.redirect(`${process.env.FRONTEND_URL}/home`);
        });
      } else {
        return res
          .status(400)
          .json({ passwordIcorrect: "Password Incorrect." });
      }
    });
  });
});

router.get(
  "/auth/google",
  cors(corsOptions),
  passport.authenticate(google, {
    scope: ["profile", "email"]
  }),
  (req, res) => {
    res.status(200);
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate(google, {
    failureRedirect: `${process.env.FRONTEND_URL}/signin`
  }),
  function(req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/?token=${res.req.user.token}`);
  }
);

// router.get(
//   "/currentUser",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     })
//   }
// );

module.exports = router;

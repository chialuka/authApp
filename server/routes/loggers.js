const express = require("express");
const router = express.Router();
const User = require("./../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const methods = require("../config/passport")

const googleMethod = methods.google
const google = googleMethod._strategies.google.name;

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
            jwt.sign(payload, key, { expiresIn: "1h" }, (err, token) => {
              res.json({
                user,
                success: true,
                token: token
              });
            });
          })
          .catch(err => console.log(err));
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
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(payload, key, { expiresIn: "1h" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
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
  passport.authenticate(google, { scope: ["profile"] })
),
  router.get(
    "auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/signin" }),
    function(req, res) {
      res.redirect("/home");
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

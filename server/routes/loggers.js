const express = require("express");
const router = express.Router();
const User = require("./../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");

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
          .then(user => res.json(user))
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
        jwt.sign(payload, key.key, { expiresIn: "1h" }, (err, token) => {
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
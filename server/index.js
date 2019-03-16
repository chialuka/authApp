const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const database = require("./database");
const session = require("express-session")
const cors = require("cors");
const uuid = require("uuid")

require("dotenv").config()

const users = require("./routes/loggers")

const port = process.env.port || 7000;

const app = express();

app.use(session({
  genid: (req) => {
    return uuid()
  },
  secret: process.env.sessionSecret,
  saveUninitialized: true,
  resave: false,
}));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(cors())

app.use(passport.initialize());

app.use(passport.session());

app.use("/api", users);


database.once("open", () => {
  app.listen(port, () => console.log("We make magic on port", port));
});

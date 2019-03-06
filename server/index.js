const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const database = require("./database");

const port = process.env.port || 8080;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());


database.once("open", () => {
  app.listen(port, () => console.log("server running on port ", port));
});

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const database = require("./database");

const users = require("./routes/loggers")

const port = process.env.port || 7000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport)

app.use("/users", users)

database.once("open", () => {
  app.listen(port, () => console.log("server running on port", port));
});

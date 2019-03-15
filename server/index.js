const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const database = require("./database");
const cors = require("cors")

require("dotenv").config()

const users = require("./routes/loggers")

const port = process.env.port || 7000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(cors())

app.use(passport.initialize());


app.use("/api", users);


database.once("open", () => {
  app.listen(port, () => console.log("We make magic on port", port));
});

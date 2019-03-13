const mongoose = require("mongoose");
mongoose.promise = global.Promise;

const uri = "mongodb://localhost:27017/authApp";

mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false }).then(
  () => {
    console.log("And we're live on the Mongo DB");
  },
  err => {
    console.log("Error: " + err + " while connecting");
  }
);

module.exports = mongoose.connection;
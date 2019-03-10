const empty = require("is-empty");
const validator = require("validator");

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = empty(data.email) ? "" : data.email;
  data.password = empty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required for login"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter password"
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please provide a valid email"
  }

  return {
    errors,
    isValid: empty(errors)
  }
}
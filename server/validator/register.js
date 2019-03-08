const empty = require("is-empty");
const validator = require("validator");

module.exports = function validateRegistration(data) {
  let errors = {};

  data.name = empty(data.name) ? "" : data.name;
  data.email = empty(data.email) ? "" : data.email;
  data.password = empty(data.password) ? "" : data.password;
  data.password2 = empty(data.password2) ? "" : data.password2;

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required"
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required"
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please provide a valid email address"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required"
  }

  if (validator.isEmpty(data.password2)) {
    errors.password = "Confirm password is required"
  }

  if (!validator.isLength(data.password, {min: 6, max: undefined})) {
    errors.password = "Password must be longer than 6 digits"
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password = "Passwords do not match"
  }

  return {
    errors,
    isValid: empty(errors)
  }
}
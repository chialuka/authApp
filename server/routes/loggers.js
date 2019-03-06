const express = require("express");
const router = express.Router();
const User = require("./../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jwt");
const passport = require("passport");
const key = require("../config/keys")
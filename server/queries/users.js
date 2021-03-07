const mongoose = require("mongoose");
const Users = require("../models/userModel");

module.exports.getUserById = (id) => Users.findById(id);

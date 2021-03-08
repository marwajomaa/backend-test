const Users = require("../models/userModel");
const boom = require("boom");

module.exports = () => async (req, res, next) => {
  const cookies = req.cookies ? req.cookies : {};

  if (cookies.token) {
    try {
      const user = await Users.findOne({ token: cookies.token });
      if (user) {
        req.user = user;
        next();
      }
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  } else {
    return res.status(400).json({ msg: "Invalid Authentication" });
  }
};

const Users = require("../models/userModel");
const boom = require("boom");

module.exports = () => async (req, res, next) => {
  console.log(req.params, "iddddddddddddddddddddddddddd");
  const id = req.params.id;
  try {
    const token = req.headers.authorization || {};
    if (!id) return res.status(400).json({ msg: "Invalid Authentication" });

    let user;
    try {
      user = await Users.findOne({ userId: id });
    } catch (err) {
      console.log(err);
    }

    console.log(user, "uuuuuuuuuuuuuuuuuuuuuser");

    if (!user) {
      console.log("oooooooooooooooooooh no user");
      return res.status(400).json({ msg: "Invalid Authentication" });
    }

    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const Users = require("../models/userModel");
const httpError = require("../middlewares/http-error");

exports.saveUser = async (req, res, next) => {
  console.log(req.body, "................................");
  try {
    const { userId, username, emailAddress, phoneNumber, password } = req.body;

    const user = await Users.findOne({ username });

    if (user) return next(new httpError("The username already exists"), 400);

    if (password.length < 6) {
      return next(new httpError("Password is at least 6 characters long"));
    }

    const newUser = new Users({
      userId,
      username,
      emailAddress,
      phoneNumber,
      password,
    });

    //save to mongodb
    await newUser.save();

    res.json({
      status: "success",
      msg: "User has been successfully saved",
      user: newUser,
    });
  } catch (err) {
    return next(new httpError("Something went wrong, please try again"), 500);
  }
};

exports.updateUser = async (req, res, next) => {
  res.json({
    status: "success",
    msg: "User has been updated successfully",
  });
};

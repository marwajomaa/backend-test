const Users = require("../models/userModel");
const httpError = require("../middlewares/http-error");

exports.getUsers = async (req, res, next) => {
  const users = await Users.find({});
  res.json({ users, msg: "Users fetched successfully" });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ userId: id });
    res.json(user);
  } catch (err) {
    return next(new httpError("User not found"), 400);
  }
};

exports.saveUser = async (req, res, next) => {
  try {
    const {
      userId,
      username,
      emailAddress,
      phoneNumber,
      password,
      token,
    } = req.body;

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
      token,
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
  const { id } = req.params;
  console.log(id);
  const { userId, username, emailAddress, phoneNumber, password } = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { userId: id },
      { userId, username, emailAddress, phoneNumber, password }
    );

    if (!user) return next(new httpError("This user not exists", 400));

    res.json({
      status: "success",
      msg: "User has been updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    next(new httpError("something went wrong, please try again"), 500);
  }
};

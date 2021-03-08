const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth");
const headers = require("../middlewares/headers");
const cors = require("cors");
const {
  saveUser,
  updateUser,
  getUsers,
  getUser,
} = require("../controllers/userCtrl");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

router.get("/", cors(corsOptions), getUsers);

router.get("/user/:id", cors(corsOptions), getUser);

router.post("/save-user", cors(corsOptions), headers, saveUser);

router.patch(
  "/update-user/:id",
  [cors(corsOptions), headers, auth()],
  updateUser
);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth");

const { saveUser, updateUser } = require("../controllers/userCtrl");

router.post("/save-user", saveUser);

router.patch("/update", auth(), updateUser);

module.exports = router;

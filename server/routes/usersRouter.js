const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth");

const { saveUser, updateUser, getUsers } = require("../controllers/userCtrl");

router.get("/", getUsers);
router.post("/save-user", saveUser);

router.patch("/update-user/:id", updateUser);

module.exports = router;

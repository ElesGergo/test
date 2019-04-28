const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/auth", authController.auth);
router.post("/login", authController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/token");

router.get("/token", tokenController.token);

module.exports = router;

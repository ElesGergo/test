const express = require("express");
const router = express.Router();
const tesztController = require("../controllers/teszt");

router.get("/token", tesztController.token);
router.post("/valid", tesztController.valid);

module.exports = router;

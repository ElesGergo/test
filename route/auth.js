const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/auth", authController.auth);
router.post("/select", authController.select);
router.post("/login", authController.login);
router.get("/users", authController.users);
router.get("/token", authController.token);
router.get("/cabinets", authController.cabinets);
router.post("/takecabinet", authController.takecabinet);
router.post("/leave", authController.leave);
router.post("/openCabinet", authController.openCabinet);
router.post("/cabinetAction", authController.cabinetAction);

module.exports = router;

const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const { authmiddleware } = require('../middleware/auth.middleware');

router.post("/request-ride",authmiddleware ,rideController.requestRide);
router.post("/accept-ride/:id",authmiddleware , rideController.acceptRide);
router.get("/ride-status", authmiddleware, rideController.getRides);

module.exports = router;
const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");

router.post("/request-ride", rideController.requestRide);
router.post("/accept-ride/:id", rideController.acceptRide);
router.get("/ride-status", rideController.getRides);

module.exports = router;
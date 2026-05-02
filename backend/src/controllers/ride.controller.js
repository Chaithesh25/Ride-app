
const Ride = require("../models/ride.model");

exports.requestRide = async (req, res) => {
  try {
    const ride = await Ride.create({
      userId: req.user.id, 
      pickup: req.body.pickup,
      drop: req.body.drop,
      status: "requested"
     });

    req.io.emit("ride-requested", ride);

    res.json({ message: "Ride requested", ride });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    req.io.emit("ride-accepted", ride);

    res.json({ message: "Ride accepted", ride });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
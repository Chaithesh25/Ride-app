const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);

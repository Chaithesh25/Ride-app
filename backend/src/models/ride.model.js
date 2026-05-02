const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pickup:{
      type: String,
      required: true
    } ,
    drop:{
        type: String,
        required: true
    },
    status: {
      type: String,
      default: "requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);

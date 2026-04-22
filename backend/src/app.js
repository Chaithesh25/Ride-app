const express = require("express");
const cors = require("cors");

const rideRoutes = require("./routes/ride.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// routes
app.use("/", rideRoutes);
app.use("/users", userRoutes);


app.get("/check", (req, res) => {
  res.send("API working");
});
module.exports = app;
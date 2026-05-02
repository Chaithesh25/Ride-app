require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rideRoutes = require("./routes/ride.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");



const createApp = (io) => {
  const app = express();

  app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }));

app.use(express.json());
  
// attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});
// 
app.use("/", rideRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

 return app;
};

module.exports = createApp;
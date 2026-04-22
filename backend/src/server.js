// Without this my app can't access secrets/configs.
require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets/socket");

connectDB();

const server = http.createServer(app);

// init socket
const io = initSocket(server);

// attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
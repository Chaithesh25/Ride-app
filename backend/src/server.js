// Without this my app can't access secrets/configs.
require("dotenv").config();

const http = require("http");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets/socket");
const createApp = require("./app");

connectDB();

const server = http.createServer();

// init socket
const io = initSocket(server);

const app = createApp(io);

server.on("request", app);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
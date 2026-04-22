const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const {Server} = require("socket.io");
const mongoose  = require('mongoose');
const server = http.createServer(app);



app.use(express.json());


//CORS configuration to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));

//only allow websocket connections from the frontend
const io =  new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
});


//mongoDB connection
mongoose.connect(process.env.MONGO_URL)
     .then(()=> console.log("Connected to MongoDB"))
     .catch(err =>
        {
            console.log("mongoDB connection failed",err);
            process.exit(1);
        });




const rideSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'requested'
    }
}, { timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);





io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    });

});

app.get("/",(req,res)=>{
    res.send("APP is Running Succesfully..")
})


app.post("/request-ride", async (req, res) => {
    try {
        const newRide = new Ride({
            status: "requested"
        });

        const savedRide = await newRide.save();

        io.emit("ride-requested", savedRide);

        res.json({
            message: "Ride requested successfully",
            ride: savedRide
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.post("/accept-ride/:id", async (req, res) => {
    try {
        const updatedRide = await Ride.findByIdAndUpdate(
            req.params.id,
            { status: "accepted" },
            { new: true }
        );

        io.emit("ride-accepted", updatedRide);

        res.json({
            message: "Ride accepted successfully",
            ride: updatedRide
        });

    } catch (err) {  
        res.status(500).json({ error: err.message });
    }
});



app.get("/ride-status", async (req, res) => {
    try{
        const rides = await Ride.find();
        res.json(rides);

    }catch(err){
        res.status(500).json({ error: err.message });
    }mongoose.connect(process.env.MONGO_URL)
     .then(()=> console.log("Connected to MongoDB"))
     .catch(err =>
        {
            console.log("mongoDB connection failed",err);
            process.exit(1);
        });

});



server.listen(3000,()=>{
    console.log("server is running on the port 3000");
})


const jwt = require('jsonwebtoken');

exports.authmiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');


        console.log("HEADER:", authHeader);


        // ✅ Safe check FIRST
        if (!authHeader) {
            return res.status(401).json({ message: "access denied, no token provided" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
const User = require('../models/user.model');

exports.createUser = async (req, res) => {

    try{
        const {name,email,role} = req.body;

        const user = await User.create({
            name,
            email,
            role
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };

};

//get all users
exports.getUsers = async (req ,res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
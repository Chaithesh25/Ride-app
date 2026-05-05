const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        console.log('Received user data:', { name, email, password, role });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save to database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // response
        res.status(201).json({
            message: 'User created successfully',
            user
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};
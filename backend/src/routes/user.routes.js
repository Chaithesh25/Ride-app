const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const { authmiddleware } = require('../middleware/auth.middleware');

router.post('/register',userController.createUser);

router.get('/profile', authmiddleware, (req, res)=>{
    res.json({
        message: 'This is a protected route',
        user: req.user});

})

module.exports =  router;
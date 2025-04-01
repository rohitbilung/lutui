const express = require('express');
const router = express.Router();
const { 
    login,
    signup,
    getUsers
 } = require('../controllers/user.controller');
 const {auth} = require('../middlewares/auth')
 const {isLoggedIn} = require('../middlewares/check')

router.post('/login', login);

router.post('/signup', signup);

router.get('/getCurrentUser', isLoggedIn, getUsers) 

// router.get('/getUser/:userId', isLoggedIn, getUsers) // for admin

module.exports = router;

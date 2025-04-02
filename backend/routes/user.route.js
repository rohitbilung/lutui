const express = require('express');
const router = express.Router();
const { 
    login,
    signup,
    getUsers,
    getCurrentUsers
 } = require('../controllers/user.controller');
 const {auth} = require('../middlewares/auth')
 const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/login', login);

router.post('/signup', signup);

router.get('/getCurrentUser', isLoggedIn, getCurrentUsers) 

router.get('/getUser/:userId', isAdmin, getUsers) // for admin

module.exports = router;

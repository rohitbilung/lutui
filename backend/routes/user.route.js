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

router.get('/getuser', isLoggedIn, getUsers)

module.exports = router;

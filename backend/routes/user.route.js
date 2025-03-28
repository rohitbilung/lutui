const express = require('express');
const router = express.Router();
const { 
    login,
    signup,
    getUsers
 } = require('../controllers/user.controller');
 const {auth} = require('../middlewares/auth')

router.post('/login', login);

router.post('/signup', signup);

router.get('/getuser', auth, getUsers)

module.exports = router;

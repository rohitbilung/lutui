const express = require('express')
const app = require('./app')
const http = require('http')
require('dotenv').config();

const port  = process.env.PORT

require('./config/db')

let server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`running on port http://localhost:${port}`)
})
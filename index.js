//Loads .env file contents into process.env.
require('dotenv').config()

// import express
const express= require('express')

// impory router
const router = require('./Routes/router')

// import cors
const cors= require('cors')

require('./db/connection')

// server connection
 const server=express()

//  set port 
 const PORT = 4000 || process.env.PORT

//  ecport uploads folder to client
server.use('/uploads',express.static('./uploads'))

 server.use(cors())
// parse the json 
 server.use(express.json())

//  server ne router set cheyan
server.use(router)

 //run the server
 server.listen(PORT,()=>{
    console.log(`EMS server started at ${PORT}`);
 })

 server.get('/',(req,res)=>{
    res.send('EMS server started...')
 })
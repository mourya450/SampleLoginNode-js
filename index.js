require('dotenv').config()
const express = require('express')
const app = express()


app.get("/",(req, res)=>{
    res.send('hello amitabh maurya')
})

app.listen(process.env.PORT ,()=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})
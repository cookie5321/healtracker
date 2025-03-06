require('dotenv').config()

const express = require('express')
const workoutRouter = require('./routes/workouts')
const mongoose = require('mongoose')

const app = express()

app.use(express.json()) // attach the request body JSON to req.body
// logging middleware
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/api/workouts', workoutRouter)

// connect to the DB using mongoose
mongoose.connect(process.env.MONGO_URI) // async; return a promise
    .then(() => {
        console.log("connected to the DB")
        // start listening ONLY after the DB is connected
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log("ERROR:", err)
    })

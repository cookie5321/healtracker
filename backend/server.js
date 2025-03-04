require('dotenv').config();

const express = require('express');
const workoutRouter = require('./routes/workouts');

const app = express();

// logging middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/workouts', workoutRouter);

app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
});
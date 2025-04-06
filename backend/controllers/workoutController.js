const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try { 
        const workout = await Workout.create({ title, reps, load }) // asynchronous
        res.status(200).json(workout) // created a document successfully, 200 response with the given object
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1}) // criteria is empty; getting all documents. -1 to sort in descending order
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const { id } = req.params // from route parameters

    if (!mongoose.Types.ObjectId.isValid(id)) { // id is not vaild format
        return res.status(404).json({ error: 'No such workout!' })
    }

    const workout = await Workout.findById(id)

    if (!workout) { // a workout with the given id doesn't exist
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

const removeWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout!'})
    }

    const workout = await Workout.findByIdAndDelete(id)
    
    if (!workout) {
        return res.status(404).json({ error: 'No such workout'})
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout!'})
    }

    const workout = await Workout.findByIdAndUpdate(id, { // only specified fields are updated
        ...req.body // spread operation
    })
    
    if (!workout) {
        return res.status(404).json({ error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    removeWorkout,
    updateWorkout
}
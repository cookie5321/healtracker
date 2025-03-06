const express = require('express')
const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    removeWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// router.use((req, res, next) => {
    // console.log("any call under /api/workouts")
    // next()
// })

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', removeWorkout)

router.patch('/:id', updateWorkout)

module.exports = router;
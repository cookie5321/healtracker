import { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            // if a request isn't recognized, it will be proxied to the URL specified in package.json
            // ONLY for development!
            const response = await fetch('http://localhost:4001/api/workouts') 
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => ( // https://stackoverflow.com/a/12878648
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Home
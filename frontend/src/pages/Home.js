import { useEffect, useState } from 'react'

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4001/api/workouts')
            const json = await response.body()

            if (response.ok) {
                setWorkouts(json)
            }
        }
    }, [])

    return (
        <div className="home">
            <h2>Home!</h2>
        </div>
    )
}

export default Home
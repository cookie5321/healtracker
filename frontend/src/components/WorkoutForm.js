import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)

    const addWorkout = async (e) => {
        e.preventDefault() // prevens the default behavior of refreshing a page

        const workout = { title, reps, load }
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json() // https://stackoverflow.com/a/37555432

        if (response.ok) {
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)

            console.log('added the following workout: ', json)
        } else {
            setError(json.error)
            console.log(json.error)
        }
    }

    return (
        <form className="create" onSubmit={addWorkout}>
            <h3>운동 추가</h3>

            <label>운동 이름</label>
            <input type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>반복 횟수</label>
            <input type="text" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
 
            <label>중량</label>
            <input type="text" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <button>추가</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { formatDistanceToNow, format } from 'date-fns'
import { ko } from 'date-fns/locale'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    const date = new Date(workout.createdAt)

    const handleClick = async () => {
        const response = await fetch('http://localhost:4001/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>횟수: </strong>{workout.reps}</p>
            <p><strong>중량: </strong>{workout.load}</p>
            <p>{formatDistanceToNow(date, { addSuffix: true, locale: ko })} ({format(date, 'yy. MM. dd. hh:mm')})</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
        </div>
    )
}

export default WorkoutDetails
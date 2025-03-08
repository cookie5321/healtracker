const WorkoutDetails = ({ workout }) => {
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>횟수: </strong>{workout.reps}</p>
            <p><strong>중량: </strong>{workout.load}</p>
        </div>
    )
}

export default WorkoutDetails
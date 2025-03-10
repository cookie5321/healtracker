import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext) // { state, dispatch }

    if (!context) throw Error('not in WorkoutContextProvider!')
    
    return context
}
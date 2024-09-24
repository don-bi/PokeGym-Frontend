import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";
import WorkoutList from "../Workout/WorkoutList";
import { useAppDispatch } from "../../app/hooks";
import { setWorkoutDaysStore, setWorkoutExercisesStore, setWorkoutSetsStore, setWorkoutSplitsStore } from "../../services/workouts";

export default function Dashboard() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setWorkoutSplitsStore(dispatch);
        setWorkoutDaysStore(dispatch);
        setWorkoutExercisesStore(dispatch);
        setWorkoutSetsStore(dispatch);
    }, [])

    return (
        <ProtectedRoute>
            <WorkoutList />
        </ProtectedRoute>
    )
}
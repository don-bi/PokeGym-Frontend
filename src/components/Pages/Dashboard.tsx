import { useEffect } from "react";
import ProtectedRoute from "../RouteHandlers/ProtectedRoute";
import WorkoutList from "../Workout/WorkoutList";
import { useAppDispatch } from "../../app/hooks";
import { setWorkoutDaysStore, setWorkoutExercisesStore, setWorkoutSetsStore, setWorkoutSplitsStore } from "../../services/workouts";
import Navbar from "../Navbar";
import './Dashboard.css';

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
            <div className="background-img flex flex-col">
                <Navbar />

                <div className="flex-1 flex">
                    <div className="w-3/12">Test</div>
                    <WorkoutList />
                    <div className="w-3/12">Test</div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
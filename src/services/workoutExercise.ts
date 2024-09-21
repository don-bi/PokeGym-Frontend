import { Dispatch } from "redux";
import { addWorkoutExercise, WorkoutExercise } from "../app/workoutExerciseSlice";
import { addWorkoutExerciseToDay } from "../app/workoutDaySlice";

export const addWorkoutExerciseStore = async (dispatch: Dispatch, workoutExercise: WorkoutExercise) => {
    try {
        dispatch(addWorkoutExercise(workoutExercise));
        dispatch(addWorkoutExerciseToDay(workoutExercise));
    } catch {
        console.log("Something went wrong in addWorkoutExerciseStore");
    }
}
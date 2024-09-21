import { Dispatch } from "redux";
import { addWorkoutDay, WorkoutDay } from "../app/workoutDaySlice";
import { addWorkoutDayToSplit } from "../app/workoutSplitSlice";

export const addWorkoutDayStore = async (dispatch: Dispatch, workoutDay: WorkoutDay) => {
    try {
        dispatch(addWorkoutDay(workoutDay));
        dispatch(addWorkoutDayToSplit(workoutDay));
    } catch {
        console.log("Something went wrong in addWorkoutDayStore");
    }
}
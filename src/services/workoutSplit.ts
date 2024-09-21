import { Dispatch } from "redux"
import { WorkoutSplit } from "../app/workoutSplitSlice"
import { setWorkoutSplits } from "../app/workoutSplitSlice"


export const setWorkoutSplitsStore = async (dispatch: Dispatch) => {
    try {
        const test:WorkoutSplit[] = [{
            Id: 1,
            Name: "Test",
            Note: "Test",
            DateStart: "2021-01-01",
            WorkoutDays: []
        }]
        dispatch(setWorkoutSplits(test));
    } catch {
        console.log("Somethingw wrong")
    }
}
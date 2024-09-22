import { setWorkoutDays, setWorkoutSplits } from '../app/workoutSlice';
import { Dispatch } from "redux"
import { WorkoutDay, WorkoutSplit } from "../app/workoutTypes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://localhost:7250",
})

export const setWorkoutSplitsStore = async (dispatch: Dispatch) => {
    try {
        const { data } = await axiosInstance.get("/WorkoutSplit");
        dispatch(setWorkoutSplits(data));
    } catch {
        console.log("Somethingw wrong")
    }
}

export const setWorkoutDaysStore = async (dispatch: Dispatch) => {
    try {
        const test:WorkoutDay[] = [{
            Id: 1,
            Name: "Test",
            Note: "Test",
            Date: "2021-01-01",
            WorkoutSplitId: 1,
        }]
        dispatch(setWorkoutDays(test));
    } catch {
        console.log("Somethingw wrong")
    }
}
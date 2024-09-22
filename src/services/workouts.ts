import { setWorkoutDays, setWorkoutSplits } from '../app/workoutSlice';
import { Dispatch } from "redux"
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
        const { data } = await axiosInstance.get("/WorkoutDay");
        dispatch(setWorkoutDays(data));
    } catch {
        console.log("Somethingw wrong")
    }
}
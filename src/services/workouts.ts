import { setWorkoutDays, setWorkoutExercises, setWorkoutSets, setWorkoutSplits } from '../app/workoutSlice';
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

export const setWorkoutExercisesStore = async (dispatch: Dispatch) => {
    try {
        const { data } = await axiosInstance.get("/WorkoutExercise");
        dispatch(setWorkoutExercises(data));
    } catch {
        console.log("Somethingw wrong")
    }
}

export const setWorkoutSetsStore = async (dispatch: Dispatch) => {
    try {
        const { data } = await axiosInstance.get("/WorkoutSet");
        dispatch(setWorkoutSets(data));
    } catch {
        console.log("Somethingw wrong")
    }
}
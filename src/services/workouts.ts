import { addWorkoutDay, addWorkoutExercise, addWorkoutSplit, setWorkoutDays, setWorkoutExercises, setWorkoutSets, setWorkoutSplits } from '../app/workoutSlice';
import { Dispatch } from "redux"
import axios from 'axios';
import { WorkoutDay, WorkoutExercise, WorkoutSplit } from '../app/workoutTypes';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    return config;
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

export const addWorkoutSplitStore = async (dispatch: Dispatch, workoutSplit: WorkoutSplit) => {
    try {
        const { data } = await axiosInstance.post("/WorkoutSplit", workoutSplit);
        dispatch(addWorkoutSplit(data));
    } catch {
        console.log("Somethingw wrong")
    }
}

export const addWorkoutDayStore = async (dispatch: Dispatch, workoutDay: WorkoutDay) => {
    try {
        const { data } = await axiosInstance.post("/WorkoutDay", workoutDay);
        dispatch(addWorkoutDay(data));
    } catch {
        console.log("Somethingw wrong")
    }
}

export const addWorkoutExerciseStore = async (dispatch: Dispatch, workoutExercise: WorkoutExercise) => {
    try {
        const { data } = await axiosInstance.post("/WorkoutExercise", workoutExercise);
        dispatch(addWorkoutExercise(data));
    } catch {
        console.log("Somethingw wrong")
    }
}
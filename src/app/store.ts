import { configureStore } from "@reduxjs/toolkit";
import workoutSplitReducer from "./workoutSplitSlice";
import workoutDayReducer from "./workoutDaySlice";
import workoutExerciseReducer from "./workoutExerciseSlice";

const rootReducer = {
    workoutSplitReducer: workoutSplitReducer,
    workoutDayReducer: workoutDayReducer,
    workoutExerciseReducer: workoutExerciseReducer,
}

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
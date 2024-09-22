import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";

const rootReducer = {
    workoutReducer: workoutReducer,
}

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
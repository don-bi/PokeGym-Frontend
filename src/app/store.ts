import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";
import authenticationReducer from "./authenticationSlice";

const rootReducer = {
    workoutReducer: workoutReducer,
    authenticationReducer: authenticationReducer,
}

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
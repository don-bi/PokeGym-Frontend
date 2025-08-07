import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";
import authenticationReducer from "./authenticationSlice";
import pokemonReducer from "./pokemonSlice";

const rootReducer = {
    workoutReducer: workoutReducer,
    authenticationReducer: authenticationReducer,
    pokemonReducer: pokemonReducer,
}

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
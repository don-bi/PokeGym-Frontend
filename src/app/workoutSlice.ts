import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutDay, WorkoutExercise, WorkoutSet, WorkoutSplit } from "./workoutTypes";

type initialStateType = {
    workoutSplits: WorkoutSplit[],
    workoutDays: WorkoutDay[],
    workoutExercises: WorkoutExercise[],
    workoutSet: WorkoutSet[],
}

const initialState: initialStateType = {
    workoutSplits: [],
    workoutDays: [],
    workoutExercises: [],
    workoutSet: [],
}

const workoutSlice = createSlice({
    name: "workout",
    initialState: initialState,
    reducers: {
        setWorkoutSplits(state, action : PayloadAction<WorkoutSplit[]>) {
            state.workoutSplits = action.payload;
        },
        setWorkoutDays(state, action: PayloadAction<WorkoutDay[]>) {
            state.workoutDays = action.payload;
        },
        setWorkoutExercises(state, action: PayloadAction<WorkoutExercise[]>) {
            state.workoutExercises = action.payload;
        },
        setWorkoutSets(state, action: PayloadAction<WorkoutSet[]>) {
            state.workoutSet = action.payload;
        },

        addWorkoutSplit(state, action: PayloadAction<WorkoutSplit>) {
            state.workoutSplits.push(action.payload);
        },
        addWorkoutDay(state, action: PayloadAction<WorkoutDay>) {
            state.workoutDays.push(action.payload);
        },
        addWorkoutExercise(state, action: PayloadAction<WorkoutExercise>) {
            state.workoutExercises.push(action.payload);
        },
        addWorkoutSet(state, action: PayloadAction<WorkoutSet>) {
            state.workoutSet.push(action.payload);
        },
    }
})

export default workoutSlice.reducer;

export const {
    setWorkoutSplits,
    setWorkoutDays,
    setWorkoutExercises,
    setWorkoutSets,

    addWorkoutSplit,
    addWorkoutDay,
    addWorkoutExercise,
    addWorkoutSet,


} = workoutSlice.actions;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WorkoutExercise = {
    Id: number,
    Name: string,
    WorkoutDayId: number,
}

const initialState: {workoutExercise: WorkoutExercise[]} = {
    workoutExercise: []
}

const workoutExerciseSlice = createSlice({
    name: "workoutExercises",
    initialState: initialState,
    reducers: {
        addWorkoutExercise(state, action: PayloadAction<WorkoutExercise>) {
            state.workoutExercise.push(action.payload);
        },
    }
})

export default workoutExerciseSlice.reducer;

export const {
    addWorkoutExercise,
} = workoutExerciseSlice.actions;
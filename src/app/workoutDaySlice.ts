import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutExercise } from "./workoutExerciseSlice";

export type WorkoutDay = {
    Id: number,
    Name: string,
    Note: string,
    Date: string,
    WorkoutSplitId: number,
    workoutExercises: WorkoutExercise[],
}

const initialState: {workoutDays: WorkoutDay[]} = {
    workoutDays: []
}

const workoutDaySlice = createSlice({
    name: "workoutDays",
    initialState: initialState,
    reducers: {
        addWorkoutDay(state, action: PayloadAction<WorkoutDay>) {
            state.workoutDays.push(action.payload);
        },
        addWorkoutExerciseToDay(state, action: PayloadAction<WorkoutExercise>) {
            const workoutDayId = action.payload.WorkoutDayId;
            const workoutDay = state.workoutDays.find(day => day.Id === workoutDayId);
            if (workoutDay) {
                workoutDay.workoutExercises.push(action.payload);
            }
        },
    }
})

export default workoutDaySlice.reducer;

export const {
    addWorkoutDay,
    addWorkoutExerciseToDay
} = workoutDaySlice.actions;
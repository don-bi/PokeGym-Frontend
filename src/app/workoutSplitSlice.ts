import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutDay } from "./workoutDaySlice";

export type WorkoutSplit = {
    Id: number,
    Name: string,
    Note: string,
    DateStart: string,
    WorkoutDays: WorkoutDay[],
}

const initialState: { workoutSplits: WorkoutSplit[] } = {
    workoutSplits: []
};

const workoutSplitSlice = createSlice({
    name: "workoutSplits",
    initialState,
    reducers: {
        setWorkoutSplits(state, action: PayloadAction<WorkoutSplit[]>) {
            state.workoutSplits = action.payload;
        },
        addWorkoutSplit(state, action: PayloadAction<WorkoutSplit>) {
            state.workoutSplits.push(action.payload);
        },
        addWorkoutDayToSplit(state, action: PayloadAction<WorkoutDay>) {
            const workoutSplitId = action.payload.WorkoutSplitId;
            const workoutSplit = state.workoutSplits.find(split => split.Id === workoutSplitId);
            if (workoutSplit) {
                workoutSplit.WorkoutDays.push(action.payload);
            }
        },
        removeWorkoutSplit(state, action: PayloadAction<number>) {
            state.workoutSplits = state.workoutSplits.filter(split => split.Id !== action.payload);
        },
    }
})

export default workoutSplitSlice.reducer;

export const { 
    setWorkoutSplits, 
    addWorkoutSplit, 
    addWorkoutDayToSplit, 
    removeWorkoutSplit 

} = workoutSplitSlice.actions;
export type WorkoutSplit = {
    Id: number,
    Name: string,
    Note: string,
    DateStart: string,
}

export type WorkoutDay = {
    Id: number,
    Name: string,
    Note: string,
    Date: string,
    WorkoutSplitId: number,
}

export type WorkoutExercise = {
    Id: number,
    Name: string,
    WorkoutDayId: number,
}

export type WorkoutSet = {
    Id: number,
    Order: number,
    Reps: number,
    Weight: number,
    WorkoutExerciseId: number,
}
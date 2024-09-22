export type WorkoutSplit = {
    id: number,
    name: string,
    note: string,
    dateStart: string,
}

export type WorkoutDay = {
    id: number,
    name: string,
    note: string,
    date: string,
    workoutSplitId: number,
}

export type WorkoutExercise = {
    id: number,
    name: string,
    workoutDayId: number,
}

export type WorkoutSet = {
    id: number,
    order: number,
    reps: number,
    weight: number,
    workoutExerciseId: number,
}
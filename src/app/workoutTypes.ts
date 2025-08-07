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

export type Pokemon = {
    id: number,
    name: string,
    pokedexNumber: number,
    imageUrl: string,
    type: string,
    isCaptured: boolean,
    spawnDate: string,
    userId: number,
    quests: Quest[],
}

export type Quest = {
    id: number,
    description: string,
    isCompleted: boolean,
    questType: string,
    requiredAmount: number,
    currentProgress: number,
    pokemonId: number,
}
import { WorkoutSplit } from "../app/workoutTypes"

export default function WokroutSplitContainer({split}: {split: WorkoutSplit}) {
    return (
        <div key={`workoutsplit${split.id}`}>
            <h1>{split.name}</h1>
            
        </div>
    )
}
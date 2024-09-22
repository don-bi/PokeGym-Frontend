import { WorkoutExercise } from "../../app/workoutTypes"
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

export default function WorkoutExerciseContainer({exercise}: {exercise: WorkoutExercise}) {
    const workoutSets = useAppSelector((state: RootState) => state.workoutReducer.workoutSet);

    return (
        <div className="w-full">
            <div className="
            flex bg-slate-100 px-4 py-2 shadow-md duration-200 gap-4"
            key={`workoutday${exercise.id}`}>
                <h1>{exercise.name}</h1>
                
                {workoutSets.map((ws) =>{
                    if (ws.workoutExerciseId === exercise.id) {
                        return (
                            <div className="bg-green-300 px-2 py-1" key={`workoutset${ws.id}`}>
                                <p>{ws.reps} x {ws.weight} lbs</p>
                            </div>
                        )
                    }
                })}

            </div>
        </div>
    )
}
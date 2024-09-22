import { useState, useTransition } from "react";
import { WorkoutDay, WorkoutExercise } from "../../app/workoutTypes"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import WorkoutExerciseContainer from "./WorkoutExerciseContainer";
import { addWorkoutExerciseStore } from "../../services/workouts";

export default function WorkoutDayContainer({day}: {day: WorkoutDay}) {
    const [open, setOpen] = useState(false);
    const [exerciseName, setExerciseName] = useState("");
    const workoutExercises = useAppSelector((state: RootState) => state.workoutReducer.workoutExercises);

    const [isPending, startTransition] = useTransition();

    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="
            flex flex-col bg-gray-200 px-4 py-2 shadow-md duration-200 cursor-pointer
            hover:bg-slate-400"
            key={`workoutday${day.id}`}
            onClick={() => setOpen(!open)}
            >
                <h1>{day.name}</h1>
            </div>

            {open && 
            <form className="px-4 py-2 flex gap-4" onSubmit={(e) => {
                const formData: WorkoutExercise = {
                    id: 0,
                    name: exerciseName,
                    workoutDayId: day.id,
                }

                e.preventDefault();
                startTransition(() => {
                    addWorkoutExerciseStore(dispatch, formData);
                })
            }}>
                <input type="text" placeholder="Day Name" className="w-full px-2 outline outline-1"
                value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}/>
                <button type="submit" className="bg-green-300 px-2 py-1 min-w-fit" disabled={isPending}>Add Exercise</button>
            </form>
            }

            {open &&
            workoutExercises.map((we) => {
                if (we.workoutDayId === day.id) {
                    return (
                        <WorkoutExerciseContainer exercise={we}/>
                    )
                }
            })}
        </div>
    )
}
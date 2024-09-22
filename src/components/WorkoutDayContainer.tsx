import { useState } from "react";
import { WorkoutDay } from "../app/workoutTypes"
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import WorkoutExerciseContainer from "./WorkoutExerciseContainer";

export default function WorkoutDayContainer({day}: {day: WorkoutDay}) {
    const [open, setOpen] = useState(false);
    const workoutExercises = useAppSelector((state: RootState) => state.workoutReducer.workoutExercises);

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
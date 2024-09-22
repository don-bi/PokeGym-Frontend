import { useState } from "react";
import { WorkoutDay, WorkoutSplit } from "../../app/workoutTypes"
import { RootState } from "../../app/store";
import WorkoutDayContainer from "./WorkoutDayContainer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addWorkoutDayStore } from "../../services/workouts";

export default function WorkoutSplitContainer({split}: {split: WorkoutSplit}) {
    const [open, setOpen] = useState(false);
    const [dayName, setDayName] = useState("");
    const [note, setNote] = useState("");

    const workoutDays = useAppSelector((state: RootState) => state.workoutReducer.workoutDays);
    const dispatch = useAppDispatch();

    return (
        <div className="w-9/12">

            <div className="
            flex flex-col bg-slate-300 w-full px-4 py-2 shadow-md duration-200 cursor-pointer
            hover:bg-slate-400"
            key={`workoutsplit${split.id}`}
            onClick={() => setOpen(!open)}
            >
                <h1>{split.name}</h1>
            </div>

            <div>
                {open &&
                <form className="px-4 py-2 flex gap-4" onSubmit={(e) => {
                    const formData: WorkoutDay = {
                        id: 0,
                        name: dayName,
                        note,
                        workoutSplitId: split.id,
                        date: new Date().toLocaleDateString('en-CA'),
                    }

                    e.preventDefault();
                    addWorkoutDayStore(dispatch, formData);
                }}>
                    <input type="text" placeholder="Day Name" className="w-full px-2 outline outline-1"
                    value={dayName} onChange={(e) => setDayName(e.target.value)}/>
                    <input type="text" placeholder="Note" className="w-full px-2 outline outline-1"
                    value={note} onChange={(e) => setNote(e.target.value)}/>
                    <button type="submit" className="bg-green-300 px-2 py-1 min-w-fit">Add Day</button>
                </form>
                }

                {open &&
                workoutDays.map((wd) => {
                    if (wd.workoutSplitId === split.id) {
                        return (
                            <WorkoutDayContainer day={wd}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}
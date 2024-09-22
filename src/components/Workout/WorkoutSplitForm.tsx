import { useState } from "react";
import { WorkoutSplit } from "../../app/workoutTypes";
import { useAppDispatch } from "../../app/hooks";
import { addWorkoutSplitStore } from "../../services/workouts";

export default function WorkoutSplitForm() {
    const [splitName, setSplitName] = useState("");
    const [note, setNote] = useState("");
    
    const dispatch = useAppDispatch();
    return (
        <form className="py-2 flex gap-4 w-9/12" onSubmit={(e) => {
            e.preventDefault();
            const formData: WorkoutSplit = {
                id: 0,
                name: splitName,
                note,
                dateStart: new Date().toLocaleDateString('en-CA'),
            }

            addWorkoutSplitStore(dispatch, formData);
        }}>
            <input type="text" placeholder="Split Name" className="w-full px-2 outline outline-1"
            value={splitName} onChange={(e) => setSplitName(e.target.value)}/>
            <input type="text" placeholder="Note" className="w-full px-2 outline outline-1"
            value={note} onChange={(e) => setNote(e.target.value)}/>
            <button type="submit" className="bg-green-300 px-2 py-1 min-w-fit">Add Split</button>
        </form>
    )
}
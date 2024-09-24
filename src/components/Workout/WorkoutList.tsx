import { WorkoutSplit } from "../../app/workoutTypes";
import { RootState } from "../../app/store";
import WorkoutSplitContainer from "./WorkoutSplitContainer";
import { useAppSelector } from "../../app/hooks";
import WorkoutSplitForm from "./WorkoutSplitForm";

export default function WorkoutList() {
    const workoutSplits = useAppSelector((state: RootState) => state.workoutReducer.workoutSplits);

    return (
        <div className="flex flex-col items-center gap-4 bg-slate-900 bg-opacity-80 h-full flex-auto backdrop-blur-sm">
            <WorkoutSplitForm />

            {workoutSplits.slice(0).reverse().map((ws: WorkoutSplit) => {
                return (
                    <WorkoutSplitContainer split={ws}/>
                )
            })}
        </div>
    )
}
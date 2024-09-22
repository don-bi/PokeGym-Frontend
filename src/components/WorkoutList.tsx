import { WorkoutSplit } from "../app/workoutTypes";
import { RootState } from "../app/store";
import WorkoutSplitContainer from "./WorkoutSplitContainer";
import { useAppSelector } from "../app/hooks";
import WorkoutSplitForm from "./WorkoutSplitForm";

export default function WorkoutList() {
    const workoutSplits = useAppSelector((state: RootState) => state.workoutReducer.workoutSplits);

    return (
        <div className="flex flex-col items-center gap-4">
            <WorkoutSplitForm />

            {workoutSplits.slice(0).reverse().map((ws: WorkoutSplit) => {
                return (
                    <WorkoutSplitContainer split={ws}/>
                )
            })}
        </div>
    )
}
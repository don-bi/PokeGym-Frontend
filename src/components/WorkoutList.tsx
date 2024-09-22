import { WorkoutDay, WorkoutSplit } from "../app/workoutTypes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import WokroutSplitContainer from "./WorkoutSplitContainer";

export default function WorkoutList() {
    const workoutSplits = useSelector((state: RootState) => state.workoutReducer.workoutSplits);

    return (
        <div>
            {workoutSplits.slice(0).reverse().map((ws: WorkoutSplit) => {
                return (
                    <WokroutSplitContainer split={ws}/>
                )
            })}
            <button onClick={() => {
                console.log(workoutSplits)
            }}>Click</button>
        </div>
    )
}
import { useState } from "react";
import { WorkoutSplit } from "../../app/workoutTypes";
import { RootState } from "../../app/store";
import WorkoutSplitContainer from "./WorkoutSplitContainer";
import { useAppSelector } from "../../app/hooks";
import WorkoutSplitForm from "./WorkoutSplitForm";

export default function WorkoutList() {
    const workoutSplits = useAppSelector((state: RootState) => state.workoutReducer.workoutSplits);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4 bg-slate-800 bg-opacity-90 h-full flex-auto backdrop-blur-sm p-6 overflow-y-auto">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6 w-full">
                    <h1 className="text-2xl font-bold text-white">Your Workout Splits</h1>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-all"
                    >
                        <span className="mr-2">{showForm ? 'Cancel' : 'Create New Split'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showForm ? 'rotate-45' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {showForm && (
                    <div className="bg-gray-700 rounded-lg p-4 mb-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Create New Workout Split</h2>
                        <WorkoutSplitForm onComplete={() => setShowForm(false)} />
                    </div>
                )}

                {workoutSplits.length === 0 ? (
                    <div className="bg-gray-700 rounded-lg p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 className="text-xl font-medium text-white mb-2">No Workout Splits Yet</h3>
                        <p className="text-gray-300 mb-4">Create your first workout split to get started tracking your fitness journey</p>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Workout Split
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {workoutSplits.slice(0).reverse().map((ws: WorkoutSplit) => (
                            <WorkoutSplitContainer key={`split-${ws.id}`} split={ws}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
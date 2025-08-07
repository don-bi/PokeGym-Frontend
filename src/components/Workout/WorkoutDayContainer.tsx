import { useState, useTransition } from "react";
import { WorkoutDay, WorkoutExercise } from "../../app/workoutTypes"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import WorkoutExerciseContainer from "./WorkoutExerciseContainer";
import { addWorkoutExerciseStore } from "../../services/workouts";

export default function WorkoutDayContainer({day}: {day: WorkoutDay}) {
    const [open, setOpen] = useState(false);
    const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);
    const [exerciseName, setExerciseName] = useState("");
    const [errors, setErrors] = useState({ name: '' });
    
    const workoutExercises = useAppSelector((state: RootState) => state.workoutReducer.workoutExercises);
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch();
    
    const filteredExercises = workoutExercises.filter(we => we.workoutDayId === day.id);
    
    const validateForm = () => {
        const newErrors = { name: '' };
        let isValid = true;
        
        if (!exerciseName.trim()) {
            newErrors.name = 'Exercise name is required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const formData: WorkoutExercise = {
            id: 0,
            name: exerciseName,
            workoutDayId: day.id,
        };

        startTransition(() => {
            addWorkoutExerciseStore(dispatch, formData);
            setExerciseName('');
            setShowAddExerciseForm(false);
        });
    };

    const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
    });

    return (
        <div className="bg-gray-600 rounded-md overflow-hidden shadow-md">
            <div 
                className="flex justify-between items-center px-4 py-3 bg-gray-500 cursor-pointer hover:bg-gray-400 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center">
                    <div className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white transition-transform duration-300 ${open ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-md font-medium text-white">{day.name}</h3>
                    </div>
                </div>
                <div className="text-sm text-gray-200">{formattedDate}</div>
            </div>

            {open && (
                <div className="p-3">
                    {day.note && (
                        <div className="mb-3 p-2 bg-gray-500 rounded text-sm">
                            <p className="text-white">{day.note}</p>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-medium text-white">Exercises</h4>
                        <button 
                            onClick={() => setShowAddExerciseForm(!showAddExerciseForm)}
                            className="flex items-center text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            {showAddExerciseForm ? 'Cancel' : 'Add Exercise'}
                        </button>
                    </div>

                    {showAddExerciseForm && (
                        <div className="mb-3 p-3 bg-gray-500 rounded">
                            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="exerciseName" className="block text-sm font-medium text-gray-200 mb-1">Exercise Name*</label>
                                    <input 
                                        id="exerciseName"
                                        type="text" 
                                        placeholder="e.g., Bench Press" 
                                        className={`w-full px-3 py-2 bg-gray-600 border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                        value={exerciseName} 
                                        onChange={(e) => setExerciseName(e.target.value)}
                                        disabled={isPending}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                </div>
                                
                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        className={`px-3 py-1.5 rounded-md text-white text-sm font-medium ${isPending ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors flex items-center`}
                                        disabled={isPending}
                                    >
                                        {isPending && (
                                            <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        Add Exercise
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {filteredExercises.length === 0 ? (
                        <div className="text-center py-6 bg-gray-500 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <h3 className="text-md font-medium text-white mb-1">No Exercises Added</h3>
                            <p className="text-sm text-gray-200 mb-3">Add exercises to track your workout</p>
                            <button 
                                onClick={() => setShowAddExerciseForm(true)}
                                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add First Exercise
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredExercises.map((we) => (
                                <WorkoutExerciseContainer key={`exercise-${we.id}`} exercise={we}/>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
import { useState } from "react";
import { WorkoutExercise, WorkoutSet } from "../../app/workoutTypes"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addWorkoutSet } from "../../app/workoutSlice";
import axios from 'axios';

export default function WorkoutExerciseContainer({exercise}: {exercise: WorkoutExercise}) {
    const [showAddSetForm, setShowAddSetForm] = useState(false);
    const [reps, setReps] = useState("8");
    const [weight, setWeight] = useState("0");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({ reps: '', weight: '' });
    
    const workoutSets = useAppSelector((state: RootState) => state.workoutReducer.workoutSet);
    const dispatch = useAppDispatch();
    
    const filteredSets = workoutSets.filter(ws => ws.workoutExerciseId === exercise.id);
    
    const validateForm = () => {
        const newErrors = { reps: '', weight: '' };
        let isValid = true;
        
        if (!reps.trim() || isNaN(Number(reps)) || Number(reps) <= 0) {
            newErrors.reps = 'Valid reps required';
            isValid = false;
        }
        
        if (!weight.trim() || isNaN(Number(weight)) || Number(weight) < 0) {
            newErrors.weight = 'Valid weight required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    // Create a function to add workout set since it's missing from the services
    const postWorkoutSet = async (set: WorkoutSet) => {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
        });
        
        axiosInstance.interceptors.request.use((config) => {
            config.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
            return config;
        });
        
        const { data } = await axiosInstance.post("/WorkoutSet", set);
        return data;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        const formData: WorkoutSet = {
            id: 0,
            order: filteredSets.length + 1, // Add the missing order property
            reps: parseInt(reps),
            weight: parseFloat(weight),
            workoutExerciseId: exercise.id,
        };

        try {
            // Use our custom function instead of the missing service function
            const newSet = await postWorkoutSet(formData);
            // Update the Redux store with the correct action creator
            dispatch(addWorkoutSet(newSet));
            setReps("8");
            setWeight("0");
            setShowAddSetForm(false);
        } catch (error) {
            console.error('Failed to add workout set:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-500 rounded overflow-hidden">
            <div className="px-4 py-3 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{exercise.name}</h4>
                    <button 
                        onClick={() => setShowAddSetForm(!showAddSetForm)}
                        className="flex items-center text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {showAddSetForm ? 'Cancel' : 'Add Set'}
                    </button>
                </div>
                
                {showAddSetForm && (
                    <div className="mb-3 p-2 bg-gray-400 rounded">
                        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label htmlFor="reps" className="block text-xs font-medium text-gray-800 mb-1">Reps*</label>
                                    <input 
                                        id="reps"
                                        type="number" 
                                        min="1"
                                        className={`w-full px-2 py-1 bg-gray-100 border ${errors.reps ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
                                        value={reps} 
                                        onChange={(e) => setReps(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                    {errors.reps && <p className="mt-1 text-xs text-red-800">{errors.reps}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="weight" className="block text-xs font-medium text-gray-800 mb-1">Weight (lbs)*</label>
                                    <input 
                                        id="weight"
                                        type="number" 
                                        min="0"
                                        step="0.5"
                                        className={`w-full px-2 py-1 bg-gray-100 border ${errors.weight ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
                                        value={weight} 
                                        onChange={(e) => setWeight(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                    {errors.weight && <p className="mt-1 text-xs text-red-800">{errors.weight}</p>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className={`px-3 py-1 rounded-md text-white text-xs font-medium ${isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors flex items-center`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    Add Set
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                
                {filteredSets.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {filteredSets.map((ws) => (
                            <div 
                                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center" 
                                key={`workoutset${ws.id}`}
                            >
                                <span className="font-medium">{ws.reps}</span>
                                <span className="mx-1">×</span>
                                <span>{ws.weight} lbs</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-2 text-sm text-gray-300">
                        No sets recorded yet
                    </div>
                )}
            </div>
        </div>
    )
}
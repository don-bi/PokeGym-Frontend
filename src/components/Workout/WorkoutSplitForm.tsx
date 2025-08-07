import { useState } from "react";
import { WorkoutSplit } from "../../app/workoutTypes";
import { useAppDispatch } from "../../app/hooks";
import { addWorkoutSplitStore } from "../../services/workouts";

interface WorkoutSplitFormProps {
    onComplete?: () => void;
}

export default function WorkoutSplitForm({ onComplete }: WorkoutSplitFormProps) {
    const [splitName, setSplitName] = useState("");
    const [note, setNote] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({ name: '' });
    
    const dispatch = useAppDispatch();

    const validateForm = () => {
        const newErrors = { name: '' };
        let isValid = true;
        
        if (!splitName.trim()) {
            newErrors.name = 'Split name is required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        const formData: WorkoutSplit = {
            id: 0,
            name: splitName,
            note,
            dateStart: startDate,
        };

        try {
            await addWorkoutSplitStore(dispatch, formData);
            setSplitName('');
            setNote('');
            setStartDate(new Date().toISOString().split('T')[0]);
            if (onComplete) onComplete();
        } catch (error) {
            console.error('Failed to add workout split:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="splitName" className="block text-sm font-medium text-gray-300 mb-1">Split Name*</label>
                    <input 
                        id="splitName"
                        type="text" 
                        placeholder="e.g., Push/Pull/Legs" 
                        className={`w-full px-3 py-2 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={splitName} 
                        onChange={(e) => setSplitName(e.target.value)}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                    <input 
                        id="startDate"
                        type="date" 
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            
            <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                <textarea 
                    id="note"
                    placeholder="Add any notes about this workout split" 
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    value={note} 
                    onChange={(e) => setNote(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            
            <div className="flex justify-end">
                <button 
                    type="submit" 
                    className={`px-4 py-2 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors flex items-center`}
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    Create Workout Split
                </button>
            </div>
        </form>
    )
}
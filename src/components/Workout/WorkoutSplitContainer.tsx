import { useState } from "react";
import { WorkoutDay, WorkoutSplit } from "../../app/workoutTypes"
import { RootState } from "../../app/store";
import WorkoutDayContainer from "./WorkoutDayContainer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addWorkoutDayStore } from "../../services/workouts";

export default function WorkoutSplitContainer({split}: {split: WorkoutSplit}) {
    const [open, setOpen] = useState(false);
    const [showAddDayForm, setShowAddDayForm] = useState(false);
    const [dayName, setDayName] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({ name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const workoutDays = useAppSelector((state: RootState) => state.workoutReducer.workoutDays);
    const dispatch = useAppDispatch();
    
    const filteredWorkoutDays = workoutDays.filter(wd => wd.workoutSplitId === split.id);
    
    const validateForm = () => {
        const newErrors = { name: '' };
        let isValid = true;
        
        if (!dayName.trim()) {
            newErrors.name = 'Day name is required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        const formData: WorkoutDay = {
            id: 0,
            name: dayName,
            note,
            workoutSplitId: split.id,
            date: date,
        };

        try {
            await addWorkoutDayStore(dispatch, formData);
            setDayName('');
            setNote('');
            setDate(new Date().toISOString().split('T')[0]);
            setShowAddDayForm(false);
        } catch (error) {
            console.error('Failed to add workout day:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <div 
                className="flex justify-between items-center px-5 py-4 bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center">
                    <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-white transition-transform duration-300 ${open ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">{split.name}</h2>
                        <p className="text-sm text-gray-300">Started: {new Date(split.dateStart).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="text-gray-300 text-sm">
                    {filteredWorkoutDays.length} {filteredWorkoutDays.length === 1 ? 'day' : 'days'}
                </div>
            </div>

            {open && (
                <div className="p-4">
                    {split.note && (
                        <div className="mb-4 p-3 bg-gray-600 rounded-md">
                            <h3 className="text-sm font-medium text-gray-300 mb-1">Notes</h3>
                            <p className="text-white whitespace-pre-wrap">{split.note}</p>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-white">Workout Days</h3>
                        <button 
                            onClick={() => setShowAddDayForm(!showAddDayForm)}
                            className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            {showAddDayForm ? 'Cancel' : 'Add Day'}
                        </button>
                    </div>

                    {showAddDayForm && (
                        <div className="mb-4 p-4 bg-gray-600 rounded-md">
                            <h3 className="text-md font-medium text-white mb-3">Add New Workout Day</h3>
                            <form className="space-y-3" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="dayName" className="block text-sm font-medium text-gray-300 mb-1">Day Name*</label>
                                        <input 
                                            id="dayName"
                                            type="text" 
                                            placeholder="e.g., Chest Day" 
                                            className={`w-full px-3 py-2 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-500'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            value={dayName} 
                                            onChange={(e) => setDayName(e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                        <input 
                                            id="date"
                                            type="date" 
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={date} 
                                            onChange={(e) => setDate(e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="dayNote" className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                                    <textarea 
                                        id="dayNote"
                                        placeholder="Add any notes about this workout day" 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={note} 
                                        onChange={(e) => setNote(e.target.value)}
                                        disabled={isSubmitting}
                                        rows={2}
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
                                        Add Workout Day
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {filteredWorkoutDays.length === 0 ? (
                        <div className="text-center py-8 bg-gray-600 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-white mb-1">No Workout Days Yet</h3>
                            <p className="text-gray-300 mb-4">Add your first workout day to this split</p>
                            <button 
                                onClick={() => setShowAddDayForm(true)}
                                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Workout Day
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredWorkoutDays.map((wd) => (
                                <WorkoutDayContainer key={`day-${wd.id}`} day={wd}/>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
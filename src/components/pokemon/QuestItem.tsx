import { useState, useEffect } from 'react';
import { Quest } from '../../app/workoutTypes';

interface QuestItemProps {
    quest: Quest;
    onProgressUpdate: (progress: number) => void;
}

export default function QuestItem({ quest, onProgressUpdate }: QuestItemProps) {
    const [progress, setProgress] = useState(quest?.currentProgress || 0);
    const [isUpdating, setIsUpdating] = useState(false);
    
    // Update local state when quest progress changes from props
    useEffect(() => {
        if (quest?.currentProgress !== undefined) {
            setProgress(quest.currentProgress);
        }
    }, [quest?.currentProgress]);
    
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newProgress = value ? parseInt(value) : 0;
        
        // Ensure progress is within valid range
        const validProgress = Math.max(0, Math.min(newProgress, quest?.requiredAmount || 0));
        setProgress(validProgress);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!quest || progress <= (quest.currentProgress || 0)) {
            return;
        }
        
        try {
            setIsUpdating(true);
            await onProgressUpdate(progress);
        } catch (error) {
            console.error('Failed to update quest progress:', error);
            // Reset to previous progress on error
            setProgress(quest.currentProgress || 0);
        } finally {
            setIsUpdating(false);
        }
    };
    
    // Calculate progress percentage with safety checks
    const progressPercentage = Math.min(
        Math.round(((quest?.currentProgress || 0) / (quest?.requiredAmount || 1)) * 100),
        100
    );
    
    return (
        <div className={`border rounded-lg p-4 ${quest.isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">{quest.description}</h5>
                <span className={`px-2 py-1 text-xs rounded-full ${
                    quest.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                }`}>
                    {quest.questType}
                </span>
            </div>
            
            <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress: {quest.currentProgress} / {quest.requiredAmount}</span>
                    <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${quest.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            
            {!quest.isCompleted && (
                <form onSubmit={handleSubmit} className="flex items-center mt-3">
                    <input
                        type="number"
                        min={quest.currentProgress}
                        max={quest.requiredAmount}
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={progress <= quest.currentProgress || isUpdating}
                        className={`ml-2 px-3 py-1 text-sm rounded ${
                            progress > quest.currentProgress && !isUpdating
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isUpdating ? 'Updating...' : 'Update'}
                    </button>
                </form>
            )}
            
            {quest.isCompleted && (
                <div className="text-green-600 font-medium text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Completed!
                </div>
            )}
        </div>
    );
}

import { useState } from 'react';
import { Pokemon } from '../../app/workoutTypes';
import { useAppDispatch } from '../../app/hooks';
import { updateQuestProgress, capturePokemonRequest } from '../../services/pokemon';
import QuestItem from './QuestItem';

interface TodaysPokemonProps {
    pokemon: Pokemon;
}

export default function TodaysPokemon({ pokemon }: TodaysPokemonProps) {
    const dispatch = useAppDispatch();
    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleCapture = async () => {
        if (!pokemon || !pokemon.id) {
            setError('Cannot capture: Pokemon data is missing');
            return;
        }
        
        try {
            setIsCapturing(true);
            setError(null);
            await capturePokemonRequest(dispatch, pokemon.id);
        } catch (err) {
            console.error('Error capturing Pokemon:', err);
            setError('Failed to capture Pokemon. Please try again.');
        } finally {
            setIsCapturing(false);
        }
    };
    
    // Check if all quests are completed with safety check for undefined quests
    const allQuestsCompleted = pokemon?.quests?.every(quest => quest?.isCompleted) || false;
    
    // If pokemon is null or undefined, show an error state
    if (!pokemon) {
        return (
            <div className="flex flex-col items-center p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-medium">Error loading Pokemon data</p>
                <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {error && (
                <div className="w-full mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <div className="relative">
                {pokemon.isCaptured && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Captured!
                    </div>
                )}
                <img 
                    src={pokemon.imageUrl || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'} 
                    alt={pokemon.name || 'Pokemon'} 
                    className="w-48 h-48 object-contain mb-4"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
                    }}
                />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{pokemon.name || 'Unknown Pokemon'}</h3>
            <p className="text-gray-600 mb-4">#{pokemon.pokedexNumber || '???'} • {pokemon.type || 'Unknown'}</p>
            
            {!pokemon.isCaptured && (
                <>
                    <div className="w-full mb-6">
                        <h4 className="text-lg font-semibold mb-2">Complete these quests to capture:</h4>
                        <div className="space-y-3">
                            {pokemon.quests?.map(quest => {
                                return quest ? (
                                    <QuestItem 
                                        key={quest.id} 
                                        quest={quest} 
                                        onProgressUpdate={(progress) => 
                                            updateQuestProgress(dispatch, quest.id, progress)
                                        } 
                                    />
                                ) : null;
                            })}
                        </div>
                    </div>
                    
                    <button 
                        className={`px-6 py-2 rounded-full font-bold ${
                            allQuestsCompleted 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!allQuestsCompleted || isCapturing}
                        onClick={handleCapture}
                    >
                        {isCapturing ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Capturing...
                            </span>
                        ) : (
                            'Capture Pokemon!'
                        )}
                    </button>
                </>
            )}
            
            {pokemon.isCaptured && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 text-center">
                    <p className="font-bold">Congratulations!</p>
                    <p>You've captured this Pokemon.</p>
                </div>
            )}
        </div>
    );
}

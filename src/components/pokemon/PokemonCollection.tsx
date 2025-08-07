import { Pokemon } from '../../app/workoutTypes';
import { useState } from 'react';

interface PokemonCollectionProps {
    pokemons: Pokemon[];
}

export default function PokemonCollection({ pokemons }: PokemonCollectionProps) {
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
    
    // Ensure pokemons is an array
    const validPokemons = Array.isArray(pokemons) ? pokemons : [];
    if (validPokemons.length === 0) {
        return (
            <div className="text-center py-12">
                <img 
                    src="/empty-pokeball.png" 
                    alt="Empty Pokeball" 
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    onError={(e) => {
                        // Fallback if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
                    }}
                />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No Pokemon Captured Yet</h3>
                <p className="text-gray-400">Complete your daily gym challenges to capture Pokemon!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {validPokemons.map(pokemon => {
                // Skip rendering if pokemon is null or undefined
                if (!pokemon) return null;
                
                return (
                    <div key={pokemon.id} className="border rounded-lg p-3 flex flex-col items-center hover:shadow-md transition-shadow">
                        <img 
                            src={imageErrors[pokemon.id] ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png' : (pokemon.imageUrl || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png')} 
                            alt={pokemon.name || 'Pokemon'} 
                            className="w-24 h-24 object-contain"
                            onError={() => {
                                setImageErrors(prev => ({
                                    ...prev,
                                    [pokemon.id]: true
                                }));
                            }}
                        />
                        <h4 className="font-semibold mt-2">{pokemon.name || 'Unknown Pokemon'}</h4>
                        <div className="text-xs text-gray-500">#{pokemon.pokedexNumber || '???'}</div>
                        <span className="mt-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {pokemon.type || 'Unknown'}
                        </span>
                        <div className="text-xs text-gray-400 mt-1">
                            Captured: {pokemon.spawnDate ? new Date(pokemon.spawnDate).toLocaleDateString() : 'Unknown date'}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodaysPokemon, getUserPokemons } from '../../services/pokemon';
import TodaysPokemon from './TodaysPokemon';
import PokemonCollection from './PokemonCollection';
import Navbar from '../Navbar';

export default function PokemonPage() {
    const dispatch = useAppDispatch();
    const { todaysPokemon, userPokemons, loading, error } = useAppSelector(state => state.pokemonReducer);

    useEffect(() => {
        // Fetch today's Pokemon and user's collection when component mounts
        getTodaysPokemon(dispatch);
        getUserPokemons(dispatch);
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 drop-shadow-sm">Pokemon Gym Challenge</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Today's Pokemon section */}
                <div className="bg-white rounded-lg shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-700">Today's Challenge</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    ) : todaysPokemon ? (
                        <TodaysPokemon pokemon={todaysPokemon} />
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">No Pokemon challenge today!</p>
                            <button 
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => getTodaysPokemon(dispatch)}
                            >
                                Refresh
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Pokemon Collection section */}
                <div className="bg-white rounded-lg shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-700">Your Pokemon Collection</h2>
                    {loading && userPokemons.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    ) : (
                        <PokemonCollection pokemons={userPokemons.filter(p => p.isCaptured)} />
                    )}
                </div>
            </div>
            </div>
            <footer className="bg-slate-800 text-white py-4 text-center mt-8">
                <p>© 2025 PokeGym - Train like a Pokemon Master</p>
            </footer>
        </div>
    );
}

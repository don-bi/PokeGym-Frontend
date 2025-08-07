import { useEffect } from "react";
import ProtectedRoute from "../RouteHandlers/ProtectedRoute";
import WorkoutList from "../Workout/WorkoutList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setWorkoutDaysStore, setWorkoutExercisesStore, setWorkoutSetsStore, setWorkoutSplitsStore } from "../../services/workouts";
import { getTodaysPokemon } from "../../services/pokemon";
import Navbar from "../Navbar";
import './Dashboard.css';
import { Link } from "react-router-dom";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { todaysPokemon, loading } = useAppSelector(state => state.pokemonReducer);

    useEffect(() => {
        setWorkoutSplitsStore(dispatch);
        setWorkoutDaysStore(dispatch);
        setWorkoutExercisesStore(dispatch);
        setWorkoutSetsStore(dispatch);
        getTodaysPokemon(dispatch);
    }, [dispatch])

    return (
        <ProtectedRoute>
            <div className="background-img">
                <Navbar />

                <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
                    <div className="w-full md:w-3/12 mb-4 md:mb-0">
                        {/* Left sidebar - could be used for stats or other features */}
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <h2 className="text-xl font-bold mb-2 text-indigo-700">Workout Stats</h2>
                            <p className="text-gray-600">Coming soon...</p>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-6/12 mb-4 md:mb-0">
                        <WorkoutList />
                    </div>
                    
                    <div className="w-full md:w-3/12">
                        {/* Pokemon challenge preview */}
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <h2 className="text-xl font-bold mb-2 text-indigo-700">Today's Pokemon Challenge</h2>
                            
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                                </div>
                            ) : todaysPokemon ? (
                                <div className="flex flex-col items-center">
                                    <img 
                                        src={todaysPokemon.imageUrl} 
                                        alt={todaysPokemon.name} 
                                        className="w-32 h-32 object-contain mb-2"
                                    />
                                    <h3 className="font-bold text-lg">{todaysPokemon.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">#{todaysPokemon.pokedexNumber} • {todaysPokemon.type}</p>
                                    
                                    <div className="mt-2 w-full">
                                        <p className="text-sm font-medium mb-1">Quest Progress:</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                            <div 
                                                className="bg-blue-500 h-2.5 rounded-full" 
                                                style={{ width: `${todaysPokemon.quests.filter(q => q.isCompleted).length / todaysPokemon.quests.length * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        to="/pokemon" 
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded w-full text-center"
                                    >
                                        View Challenge
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-600 mb-2">No Pokemon challenge today!</p>
                                    <Link 
                                        to="/pokemon" 
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded inline-block"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <footer className="bg-slate-800 text-white py-4 text-center mt-auto">
                    <p>© 2025 PokeGym - Train like a Pokemon Master</p>
                </footer>
            </div>
        </ProtectedRoute>
    )
}
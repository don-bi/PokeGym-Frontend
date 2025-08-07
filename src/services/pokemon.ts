import { Dispatch } from "redux";
import axios from "axios";
import { 
    setLoading, 
    setError, 
    setTodaysPokemon, 
    setUserPokemons, 
    updateQuest, 
    capturePokemon 
} from "../app/pokemonSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
    return config;
});

export const getTodaysPokemon = async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        
        const response = await axiosInstance.get("/Pokemon/today");
        
        // Validate response data
        if (response.data) {
            dispatch(setTodaysPokemon(response.data));
        } else {
            console.warn("Received empty data from Pokemon/today endpoint");
            dispatch(setError("No Pokemon data available today"));
        }
    } catch (error: any) {
        console.error("Error fetching today's Pokemon:", error);
        
        // Provide more specific error messages based on error type
        if (error.response) {
            // Server responded with an error status code
            if (error.response.status === 401) {
                dispatch(setError("Authentication error. Please log in again."));
            } else if (error.response.status === 404) {
                dispatch(setError("No Pokemon available today. Try spawning a new one."));
            } else {
                dispatch(setError(`Server error: ${error.response.status}. Please try again later.`));
            }
        } else if (error.request) {
            // Request was made but no response received
            dispatch(setError("Network error. Please check your connection."));
        } else {
            // Something else caused the error
            dispatch(setError("Failed to fetch today's Pokemon. Please try again."));
        }
    } finally {
        dispatch(setLoading(false));
    }
};

export const getUserPokemons = async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        
        const response = await axiosInstance.get("/Pokemon");
        
        // Validate response data
        if (response.data && Array.isArray(response.data)) {
            dispatch(setUserPokemons(response.data));
        } else {
            console.warn("Received invalid data format from Pokemon endpoint");
            dispatch(setUserPokemons([]));
        }
    } catch (error: any) {
        console.error("Error fetching user's Pokemon:", error);
        
        // Provide more specific error messages based on error type
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(setError("Authentication error. Please log in again."));
            } else {
                dispatch(setError(`Server error: ${error.response.status}. Please try again later.`));
            }
        } else if (error.request) {
            dispatch(setError("Network error. Please check your connection."));
        } else {
            dispatch(setError("Failed to fetch your Pokemon collection. Please try again."));
        }
        
        // Set empty array to avoid undefined errors in components
        dispatch(setUserPokemons([]));
    } finally {
        dispatch(setLoading(false));
    }
};

export const spawnRandomPokemon = async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        
        const response = await axiosInstance.post("/Pokemon/spawn");
        
        if (response.data) {
            dispatch(setTodaysPokemon(response.data));
        } else {
            console.warn("Received empty data from Pokemon/spawn endpoint");
            dispatch(setError("Failed to spawn a new Pokemon. Please try again."));
        }
    } catch (error: any) {
        console.error("Error spawning Pokemon:", error);
        
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(setError("Authentication error. Please log in again."));
            } else if (error.response.status === 429) {
                dispatch(setError("You've already spawned a Pokemon today. Try again tomorrow."));
            } else {
                dispatch(setError(`Server error: ${error.response.status}. Please try again later.`));
            }
        } else if (error.request) {
            dispatch(setError("Network error. Please check your connection."));
        } else {
            dispatch(setError("Failed to spawn a new Pokemon. Please try again."));
        }
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateQuestProgress = async (dispatch: Dispatch, questId: number, progress: number) => {
    try {
        // Validate inputs
        if (!questId || isNaN(questId) || questId <= 0) {
            console.error("Invalid quest ID:", questId);
            dispatch(setError("Invalid quest ID"));
            return;
        }
        
        if (progress < 0 || isNaN(progress)) {
            console.error("Invalid progress value:", progress);
            dispatch(setError("Invalid progress value"));
            return;
        }
        
        dispatch(setLoading(true));
        dispatch(setError(null));
        
        const response = await axiosInstance.put(`/Pokemon/quest/${questId}/progress`, { progress }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data) {
            dispatch(updateQuest(response.data));
        } else {
            console.warn("Received empty data from quest progress update endpoint");
            dispatch(setError("Failed to update quest progress. Please try again."));
        }
    } catch (error: any) {
        console.error("Error updating quest progress:", error);
        
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(setError("Authentication error. Please log in again."));
            } else if (error.response.status === 404) {
                dispatch(setError("Quest not found. It may have been deleted."));
            } else if (error.response.status === 400) {
                dispatch(setError("Invalid progress value. Please try again."));
            } else {
                dispatch(setError(`Server error: ${error.response.status}. Please try again later.`));
            }
        } else if (error.request) {
            dispatch(setError("Network error. Please check your connection."));
        } else {
            dispatch(setError("Failed to update quest progress. Please try again."));
        }
    } finally {
        dispatch(setLoading(false));
    }
};

export const capturePokemonRequest = async (dispatch: Dispatch, pokemonId: number) => {
    try {
        // Validate input
        if (!pokemonId || isNaN(pokemonId) || pokemonId <= 0) {
            console.error("Invalid Pokemon ID:", pokemonId);
            dispatch(setError("Invalid Pokemon ID"));
            return;
        }
        
        dispatch(setLoading(true));
        dispatch(setError(null));
        
        const response = await axiosInstance.post(`/Pokemon/capture/${pokemonId}`);
        
        // Check if the request was successful
        if (response.status >= 200 && response.status < 300) {
            dispatch(capturePokemon(pokemonId));
        } else {
            console.warn(`Unexpected response status: ${response.status}`);
            dispatch(setError("Failed to capture Pokemon. Please try again."));
        }
    } catch (error: any) {
        console.error("Error capturing Pokemon:", error);
        
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(setError("Authentication error. Please log in again."));
            } else if (error.response.status === 404) {
                dispatch(setError("Pokemon not found. It may have been deleted."));
            } else if (error.response.status === 400) {
                dispatch(setError("Cannot capture this Pokemon. Complete all quests first!"));
            } else {
                dispatch(setError(`Server error: ${error.response.status}. Please try again later.`));
            }
        } else if (error.request) {
            dispatch(setError("Network error. Please check your connection."));
        } else {
            dispatch(setError("Failed to capture Pokemon. Please try again."));
        }
    } finally {
        dispatch(setLoading(false));
    }
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, Quest } from "./workoutTypes";

type initialStateType = {
    todaysPokemon: Pokemon | null,
    userPokemons: Pokemon[],
    loading: boolean,
    error: string | null,
}

const initialState: initialStateType = {
    todaysPokemon: null,
    userPokemons: [],
    loading: false,
    error: null,
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setTodaysPokemon(state, action: PayloadAction<Pokemon>) {
            state.todaysPokemon = action.payload;
        },
        setUserPokemons(state, action: PayloadAction<Pokemon[]>) {
            state.userPokemons = action.payload;
        },
        updateQuest(state, action: PayloadAction<Quest>) {
            if (state.todaysPokemon) {
                const questIndex = state.todaysPokemon.quests.findIndex(q => q.id === action.payload.id);
                if (questIndex !== -1) {
                    state.todaysPokemon.quests[questIndex] = action.payload;
                }
            }
            
            // Also update in userPokemons if present
            const pokemonIndex = state.userPokemons.findIndex(p => 
                p.quests.some(q => q.id === action.payload.id)
            );
            
            if (pokemonIndex !== -1) {
                const questIndex = state.userPokemons[pokemonIndex].quests.findIndex(q => q.id === action.payload.id);
                if (questIndex !== -1) {
                    state.userPokemons[pokemonIndex].quests[questIndex] = action.payload;
                }
            }
        },
        capturePokemon(state, action: PayloadAction<number>) {
            if (state.todaysPokemon && state.todaysPokemon.id === action.payload) {
                state.todaysPokemon.isCaptured = true;
            }
            
            const pokemonIndex = state.userPokemons.findIndex(p => p.id === action.payload);
            if (pokemonIndex !== -1) {
                state.userPokemons[pokemonIndex].isCaptured = true;
            }
        }
    }
});

export default pokemonSlice.reducer;

export const {
    setLoading,
    setError,
    setTodaysPokemon,
    setUserPokemons,
    updateQuest,
    capturePokemon
} = pokemonSlice.actions;

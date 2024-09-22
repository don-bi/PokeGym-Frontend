import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    isLoggedIn: false,
}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<typeof initialState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
})
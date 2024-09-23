import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    isLoggedIn: false,
}

type AuthenticatedUser = {
    username: string,
    email: string,
    token: string,
}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<AuthenticatedUser>) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('username', action.payload.username);
            sessionStorage.setItem('email', action.payload.email);
        }
    }
})

export default authenticationSlice.reducer;

export const { setIsAuthenticated } = authenticationSlice.actions;
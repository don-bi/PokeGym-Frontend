import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Outlet } from "react-router-dom";
import { StrictMode } from "react";

export default function Layout() {

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <StrictMode>
                <Outlet />
                </StrictMode>
            </Provider>
        </GoogleOAuthProvider>
    )
}
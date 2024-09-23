import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setIsAuthenticated } from "../app/authenticationSlice";

export default function CheckAuth({children}: {children: React.ReactElement}) {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.authenticationReducer.isLoggedIn);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const email = sessionStorage.getItem('email');
        const username = sessionStorage.getItem('username');
        if (!isLoggedIn && token && email && username) {
            dispatch(setIsAuthenticated({username, email, token}));
        }
    }, [])

    return <>{children}</>
}
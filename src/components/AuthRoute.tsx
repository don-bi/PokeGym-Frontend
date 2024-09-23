import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CheckAuth from "./CheckAuth";

export default function AuthRoute({children}: {children: React.ReactElement}) {
    const isLoggedIn = useAppSelector(state => state.authenticationReducer.isLoggedIn);

    return (
        <CheckAuth>
            {isLoggedIn 
            ? <Navigate to="/dashboard" replace={true}/> 
            : <>{children}</>
            }
        </CheckAuth>
    )
}
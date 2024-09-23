import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { Dispatch } from "redux";
import { setIsAuthenticated } from "../app/authenticationSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

export const googleSignIn = async (dispatch: Dispatch, token: CredentialResponse) => {
    try {
        const { data } = await axiosInstance.post(`Authentication/Google?token=${token.credential}`)
        dispatch(setIsAuthenticated(data));
    } catch {
        console.log("Something went wrong")
    }
}
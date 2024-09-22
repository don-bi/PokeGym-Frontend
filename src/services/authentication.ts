import { CredentialResponse } from "@react-oauth/google";
import { Dispatch } from "redux";

export const googleSignIn = (dispatch: Dispatch, token: CredentialResponse) => {
    console.log(token);
}
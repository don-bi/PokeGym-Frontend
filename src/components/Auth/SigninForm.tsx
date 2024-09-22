import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../../services/authentication";
import { useAppDispatch } from "../../app/hooks";


export default function SignInForm() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <GoogleLogin
            onSuccess={(credentialResponse) => {
                googleSignIn(dispatch, credentialResponse);
            }}

            onError={() => {
                console.log("Error");
            }}
            />
        </div>
    )
}
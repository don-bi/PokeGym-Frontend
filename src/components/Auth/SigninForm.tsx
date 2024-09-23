import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../../services/authentication";
import { useAppDispatch } from "../../app/hooks";
import './SignInForm.css';


export default function SignInForm() {
    const dispatch = useAppDispatch();

    return (
        <main className="eevee flex items-center justify-center">
            
            <div className="middle-container flex flex-col w-3/12 gap-10 items-center backdrop-blur-sm h-4/6 shadow-slate-400 rounded-lg px-10 py-6">
                <div className="flex items-center">
                    <img src="/pokeball-icon.png" alt="" className="w-20"/>
                    <h1 className="text-4xl font-bold text-slate-200 logo-text">PokeGym</h1>
                </div>

                <GoogleLogin
                onSuccess={(credentialResponse) => {
                    googleSignIn(dispatch, credentialResponse);
                }}

                onError={() => {
                    console.log("Error");
                }}
                />

                <div className="text-slate-200 font-semibold">
                    Please sign in with your Google account to continue.
                </div>
            </div>
        </main>
    )
}
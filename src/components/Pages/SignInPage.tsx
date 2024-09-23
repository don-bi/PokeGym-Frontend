import SignInForm from "../Auth/SigninForm";
import AuthRoute from "../AuthRoute";

export default function SignInPage() {
    return (
        <AuthRoute>
            <SignInForm />
        </AuthRoute>
    )
} 
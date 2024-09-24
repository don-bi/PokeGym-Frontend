import SignInForm from "../Auth/SigninForm";
import AuthRoute from "../RouteHandlers/AuthRoute";

export default function SignInPage() {
    return (
        <AuthRoute>
            <SignInForm />
        </AuthRoute>
    )
} 
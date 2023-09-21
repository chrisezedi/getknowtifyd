'use client';

import SignupForm from "@/components/auth/signup-form/signup-form";
import AuthUIWrapper from "@/components/auth/auth-wrapper/auth-wrapper";

const Signup = () => {
    return (
        <AuthUIWrapper>
            <SignupForm />
        </AuthUIWrapper>
    )
}

export default Signup
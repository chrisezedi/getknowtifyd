'use client';

import SigninForm from "@/components/auth/signin-form/signin-form";
import AuthUIWrapper from "@/components/auth/auth-wrapper/auth-wrapper";

const Signin = () => {
    return (
        <AuthUIWrapper>
            <SigninForm />
        </AuthUIWrapper>
    )
}

export default Signin
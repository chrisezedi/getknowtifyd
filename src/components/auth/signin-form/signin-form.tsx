import styles from "../auth-wrapper/auth-wrapper.module.css";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../../err-msg/error-msg";
import { useState } from "react";
import VisibiltyToggler from "../../visibility-toggler/visibilty-toggler";
import SocialAuth from "../../auth/social-auth/social-auth";

const signinSchema = z.object({
    email: z.string().email({ message: "Please enter a valid e-mail!" }),
    password: z.string().min(8, { message: "Passwords must be at least 8 characters!" }),
});

type signinFieldValues = z.infer<typeof signinSchema>;

const SigninForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<signinFieldValues>({ mode: 'all', resolver: zodResolver(signinSchema) });

    const onSubmit: SubmitHandler<signinFieldValues> = (data) => {
        console.log(data);
    }

    const handlePasswordVisibility = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: boolean) => {
            setShowPassword(value);
    }

    return (
        <section className={`${styles.section}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="signup_form min-w-full rounded shadow-inner">
            <h1 className={`${styles.welcome_txt} mb-4 text-4xl text-white`}>Welcome!</h1>
            <div>
                <div>
                    <input className={`${styles.form_control} w-full p-3 rounded mb-3`} type="text" id="email" placeholder="Email" {...register('email')} />
                    {errors?.email && <ErrorMsg message={errors.email.message} />}
                </div>

                <div>
                    <input className={`${styles.form_control} w-full p-3 rounded mb-3 relative z-1`} type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" {...register('password')} />

                    <VisibiltyToggler showPassword={showPassword} handlePasswordVisibility={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handlePasswordVisibility(event, !showPassword)} />

                    {errors?.password && <ErrorMsg message={errors.password.message} />}
                </div>
            </div>

            <button type="submit" className={`${styles.auth_btn} ${!isValid && 'disabled'} btn  mt-3`} disabled={!isValid}>Sign In</button>

        </form>
            <SocialAuth link="/auth/signup"/>
        </section>
    )
}

export default SigninForm
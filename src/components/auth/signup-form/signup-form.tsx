'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios"
import styles from "../auth-wrapper/auth-wrapper.module.css";
import VisibiltyToggler from "../../visibility-toggler/visibilty-toggler";
import ErrorMsg from "../../err-msg/error-msg";
import SocialAuth from "../../auth/social-auth/social-auth";
import Loader from "../../loaders/loader";
import { useToast } from "@/components/ui/toast/use-toast";

const signupSchema = z.object({
    first_name: z.string().min(1, { message: "First name is required!" }).max(50, { message: "First name should have a maximum of 50 characters!" }),
    last_name: z.string().min(1, { message: "Last name is required!" }).max(50, { message: "Last name should have a maximum of 50 characters!" }),
    email: z.string().email({ message: "Please enter a valid e-mail!" }),
    password: z.string().min(8, { message: "Passwords must be at least 8 characters!" }),
    confirmPassword: z.string().min(8, { message: "Passwords must be at least 8 characters!" })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword']
});

type signupFieldValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [mailSent, setMailSent] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<signupFieldValues>({ mode: 'all', resolver: zodResolver(signupSchema) });

    const router = useRouter();
    const searchParams = useSearchParams();
    const activate = searchParams.get('activate');
    const { toast } = useToast();


    useEffect(() => {

        activate ? setMailSent(true) : setMailSent(false);

    }, [mailSent, activate])

    const onSubmit: SubmitHandler<signupFieldValues> = async (data) => {
        setIsFetching(true);
        try {
            const { confirmPassword, ...payload } = data;
            const response = await axios.post(`http://${process.env.NEXT_PUBLIC_GNTF_API}/auth/signup`, {...payload});

            if (response) {
                router.push('/auth/signup?activate=true');
            }
        } catch(error){
            const axiosError = error as AxiosError;
            const errorMsg = axiosError.response?.data as {email:string[]}
            if (errorMsg?.email) {
                toast({title:'User Exists',description:errorMsg?.email[0],variant:'destructive'})
            }
        }
        finally{
            setIsFetching(false);
        }
    }

    const handlePasswordVisibility = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: 'password' | 'confirmPassword', value: boolean) => {

        if (type === "password") {
            setShowPassword(value);
        }

        if (type === "confirmPassword") {
            setShowConfirmPassword(value);
        }
    }

    return (
        <>
            {
                !mailSent ?
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

                                    <VisibiltyToggler showPassword={showPassword} handlePasswordVisibility={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handlePasswordVisibility(event, 'password', !showPassword)} />

                                    {errors?.password && <ErrorMsg message={errors.password.message} />}
                                </div>

                                <div>
                                    <input className={`${styles.form_control} w-full p-3 rounded mb-3`} type={showConfirmPassword ? 'text' : 'password'} id="confirm_password" placeholder="Confirm Password" {...register('confirmPassword')} />

                                    <VisibiltyToggler showPassword={showConfirmPassword} handlePasswordVisibility={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handlePasswordVisibility(event, 'confirmPassword', !showConfirmPassword)} />

                                    {errors?.confirmPassword && <ErrorMsg message={errors.confirmPassword.message} />}
                                </div>

                                <div>
                                    <input className={`${styles.form_control} w-full p-3 rounded mb-3`} type="text" id="firstname" placeholder="Firstname" {...register('first_name')} />
                                    {errors?.first_name && <ErrorMsg message={errors.first_name.message} />}
                                </div>

                                <div>
                                    <input className={`${styles.form_control} w-full p-3 rounded mb-3`} type="text" id="lastname" placeholder="Lastname" {...register('last_name')} />
                                    {errors?.last_name && <ErrorMsg message={errors.last_name.message} />}
                                </div>
                            </div>

                            <button type="submit" className={`${styles.auth_btn} ${!isValid && 'disabled'} btn  mt-3 flex justify-center items-center`} disabled={!isValid}>
                                {!isFetching && 'Sign Up'}
                                {isFetching && <Loader />}
                            </button>


                        </form>
                        <SocialAuth link="/auth/signin" />
                    </section>
                    :
                    <div className={`${styles.mailsent} rounded`}>
                        <Image className="mx-auto" src="/mailsent.svg" alt="mailsent image" width="200" height="200"/>
                        <p className="text-center my-6">
                        Congratulations! 🎉 An activation link has been sent to your email address
                        </p>

                        <small className="block text-center">
                        Thank you for choosing us, and we look forward to having you as a valued member of our community!
                        </small>
                    </div>
            }
        </>
    )
}

export default SignupForm
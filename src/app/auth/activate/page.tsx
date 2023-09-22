'use client'

import axios, { AxiosError } from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorCard from '@/components/errors/errors';
import { Error } from '@/types';
import { useToast } from '@/components/ui/toast/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card/card';
import Image from 'next/image';

const ActivateAccount = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const [error, setError] = useState<Error | null>();
    const [loading, setLoading] = useState<boolean>();
    const [mailSent, setMailSent] = useState<string>('');

    const { toast } = useToast();

    const setErrorResponse = (error: unknown) => {
        const axiosError = error as AxiosError;
        const errorMsg = axiosError.response?.data as Error
        setError(errorMsg);
    }

    const resendActivationMail = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/auth/resendactivationmail', { uid, token })

            if (response.data?.redirect) {
                toast({ title: 'Activated Account', description: response.data.message });
                router.push(response.data?.redirect)
            } else {
                setError(null);
                setMailSent(response.data?.message);
            }
        } catch (error) {
            setErrorResponse(error)
        }

        setLoading(false);
    }

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.put('http://127.0.0.1:8000/auth/activate', { uid, token });
                if (response) {
                    toast({ title: 'Account Activated', description: response.data.message });
                    router.push('/');
                }
            } catch (error) {
                setErrorResponse(error);
            }
        }
        activateAccount();
    }, [])

    return (
        <div className="flex justify-center w-full h-screen items-center">
            {error && <ErrorCard error={error} resendActivationMail={resendActivationMail} loading={loading} />}
            {
                (mailSent && !error) &&
                <Card className='max-w-[90%] md:min-w-[30%]'>
                    <CardHeader><h1 className='text-center'>Activation Mail Sent</h1></CardHeader>
                    <CardContent>
                        <Image className="mx-auto" src="/mailsent.svg" alt="mailsent image" width="200" height="200" />
                        <p className='text-center mt-8'>{mailSent}</p>
                    </CardContent>
                </Card>

            }
        </div>
    )
}

export default ActivateAccount
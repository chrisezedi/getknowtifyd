'use client'

import axios, {AxiosError} from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorCard from '@/components/errors/errors';
import { Error } from '@/types';
import { useToast } from '@/components/ui/toast/use-toast';

const ActivateAccount = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>();
    const { toast } = useToast();

    const resendActivationMail = async() => {
       try {
        setLoading(true);
        const response = await axios.post('http://127.0.0.1:8000/auth/resendactivationmail',{ uid })

        console.log(response);
        if (response.data?.redirect) {
            toast({title:'Activated Account',description:response.data.message});
            router.push(response.data?.redirect)
        }else{
            toast({title:'Activation Mail Sent',description:response.data.message});
        }
       } catch (error) {
        console.log(error)
       }

        setLoading(false);
    }

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.put('http://127.0.0.1:8000/auth/activate',{"uid":uid})

                console.log(response)
                // response.ok ? router.push('/') : setError(errorMsg);
            } catch (error) {
                const axiosError = error as AxiosError;
                const errorMsg = axiosError.response?.data as Error
                setError(errorMsg);
            }
        }
        activateAccount();
    }, [])

    return (
    <div>
        {error && <ErrorCard error={error} resendActivationMail={resendActivationMail} loading={loading}/>}
    </div>
    )
}

export default ActivateAccount
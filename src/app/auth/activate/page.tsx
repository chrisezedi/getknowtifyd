'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorCard from '@/components/errors/errors';

const ActivateAccount = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const [error, setError] = useState<{msg:string}>();
    const [loading, setLoading] = useState<boolean>();


    const resendActivationMail = async() => {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/auth/resendactivationmail', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uid }) });

        // const errorMsg = JSON.parse(await response.text());
        // response.ok ? router.push('/') : setError(errorMsg);
        if (response.ok) {
            const result = await response.json();
            result.redirect && router.push(result.redirect);
            console.log(result)
        }

        setLoading(false);
    }

    useEffect(() => {
        const activateAccount = async () => {
            const response = await fetch('http://127.0.0.1:8000/auth/activate', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uid, token }) });

            const errorMsg = JSON.parse(await response.text());
            response.ok ? router.push('/') : setError(errorMsg);

            console.log(errorMsg)
        }
        activateAccount();
    }, [])

    return (
    <div>
        {error && <ErrorCard msg={error.msg} resendActivationMail={resendActivationMail} loading={loading}/>}
    </div>
    )
}

export default ActivateAccount
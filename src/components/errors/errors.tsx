import Image from "next/image"
import Loader from "../loaders/loader"
import { Error } from "@/types"

const ErrorCard: React.FC<{error:Error, resendActivationMail?: () => void, loading?: boolean }> = ({ error, resendActivationMail, loading }) => {
    return <div className="flex justify-center w-full h-screen items-center">
        <div className="bg-slate-50 rounded shadow min-w-[90%] md:min-w-[30%] min-h-[70%] flex flex-col justify-center items-center">
            <Image src="/error.svg" alt="error logo" width={100} height={100}></Image>

            <p className="pt-10 text-center text-xl">{error.message}</p>

            <button disabled={loading} className="disabled:opacity-75 rounded-full mt-14 bg_primary text-white py-3 px-6" onClick={resendActivationMail}>
                {!loading ? 'Resend Activation Link' : <Loader />}

            </button>

        </div>
    </div>
}

export default ErrorCard
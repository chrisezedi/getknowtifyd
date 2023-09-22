'use client';

import styles from "./auth-wrapper.module.css";
import { pacifico } from '@/app/fonts';

const AuthUIWrapper = ({children}:any) => {
    return (
        <section>
            <div className={`${styles.auth_wrapper} ${styles.auth_bg} flex justify-center items-center md:hidden`}>
                { children }
            </div>

            <div className={`${styles.auth_wrapper} hidden md:flex justify-center items-center`}>
                <div className={`${styles.auth_bg} shadow-lg w-5/6 rounded-3xl flex justify-center`}>
                    <div className="w-3/5 flex flex-col justify-center rounded-s-3xl items-center bg-gradient-to-r from-bg-secondary to-bg-primary opacity-90">
                        <h1 className={`${pacifico.className} text-6xl text-center text-white mb-8`}><span className="text_primary animate-bounce">G</span>etknowtifyd</h1>
                        <h1 className="text-2xl text-center text-white">The one platform to keep track <br /> of all events of interests!</h1>
                    </div>
                    <div className="w-2/5 bg-white py-16 px-6">
                        { children }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthUIWrapper
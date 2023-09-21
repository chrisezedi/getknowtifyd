import Image from "next/image"
import styles from "./splash.module.css"

const Splash = () => {
    return (
        <section className={styles.splash}>
            <Image src="/white-bell.svg" className="animate-bounce" alt="white bell" width={100} height={100}/>
            <div className="flex justify-center items-center">
                <h1 className="splash_text animate-pulse">Getknowtifyd!</h1>
            </div>
        </section>
    )
}

export default Splash
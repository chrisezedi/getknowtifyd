import Image from "next/image";
import Link from "next/link";
import styles from "./social-auth.module.css";

const SocialAuth = ({ link }: { link: string }) => {
    return (
        <footer>
            <p className="text-center my-3 text-white">OR</p>

            <button className={`${styles.social_btn} btn`}>
                <span className="flex justify-center items-center">
                    <Image src="/google-logo.svg" width={20} height={20} alt="google-logo" />
                    <span className="ml-3">Continue with Google</span>
                </span>
            </button>
            <footer className={`${styles.footer} mt-3 text-center`}>
                <span>{link === "/auth/signup" ? "Don't have an account?" : "Already have an account?"}<span className="text_secondary ml-2"><Link href={link}>{link === "/auth/signup" ? "Sign Up" : "Sign In"}</Link></span></span>
            </footer>
        </footer>
    )
}

export default SocialAuth
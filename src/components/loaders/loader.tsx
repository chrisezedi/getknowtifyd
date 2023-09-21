import styles from "./loader.module.css";

const Loader = () => {
    return <div className="wrapper flex justify-center">
        <span className="mr-3">processing...</span><span className={styles.loader}></span>
    </div>
}

export default Loader
import styles from './error-msg.module.css';

const ErrorMsg = (props:{message:string | undefined}) => {
    return <p className={`${styles.err_text_color} text-red-400 mb-3 text-xs`} >{props.message}</p>
}

export default ErrorMsg
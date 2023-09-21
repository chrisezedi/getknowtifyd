import { FiEye, FiEyeOff } from "react-icons/fi";

interface VisibiltyToggler {
    showPassword:boolean,
    handlePasswordVisibility:(event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const VisibiltyToggler = ({ showPassword,handlePasswordVisibility }:VisibiltyToggler) => {
    return (
        <div className="cursor-pointer relative z-2 float-right -mt-10 pr-2" onClick={handlePasswordVisibility}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
        </div>
    )
}

export default VisibiltyToggler
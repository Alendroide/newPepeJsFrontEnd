import { useNavigate } from "react-router-dom";

export default function BackArrow(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return(
        <img
            src="/backArrow.svg"
            style={{
                width : '30px'
            }}
            className="backArrow"
            onClick={handleClick}
        />
    )
}
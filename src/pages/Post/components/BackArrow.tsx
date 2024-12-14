import { Link } from "react-router-dom";

export default function BackArrow(){
    return(
        <div className="m-5">
            <Link to={'/'}>
                <img
                    src="/backArrow.svg"
                    style={{
                        width : '30px'
                    }}
                />
            </Link>
        </div>
    )
}
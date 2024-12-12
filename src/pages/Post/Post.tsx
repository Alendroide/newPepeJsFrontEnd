import { Link } from "react-router-dom"
import FetchPost from "./components/FetchPost"
import Navbar from "../../components/Navbar"
export default function Post(){
    return(
        <div>
            <Navbar/>
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
            <FetchPost/>
        </div>
    )
}
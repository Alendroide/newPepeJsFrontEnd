import FetchPost from "./components/FetchPost"
import Navbar from "../../components/Navbar"
import BackArrow from "./components/BackArrow"
import './css/styles.css'
export default function Post(){
    return(
        <div>
            <Navbar/>
            <div className="m-5">
                <BackArrow/>
            </div>
            <FetchPost/>
        </div>
    )
}
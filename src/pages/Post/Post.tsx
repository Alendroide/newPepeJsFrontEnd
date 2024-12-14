import FetchPost from "./components/FetchPost"
import Navbar from "../../components/Navbar"
import BackArrow from "./components/BackArrow"
export default function Post(){
    return(
        <div>
            <Navbar/>
            <BackArrow/>
            <FetchPost/>
        </div>
    )
}
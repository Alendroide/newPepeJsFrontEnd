import FetchPost from "./components/FetchPost"
import PostForm from "./components/PostForm"
import Navbar from "../../components/Navbar"

export default function Home(){

    return(
        <div>
            <Navbar/>
            <PostForm/>
            <FetchPost/>
        </div>
    )
}
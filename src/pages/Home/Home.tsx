import { useState } from "react"
import FetchPost from "./components/FetchPost"
import PostForm from "./components/PostForm"
import Navbar from "../../components/Navbar"

export default function Home(){
    
    const [reloadPost,setReloadPost] = useState<boolean>(true)
    const reloadFunction = () => {
        setReloadPost(prev=>!prev);
    }
    return(
        <div>
            <Navbar/>
            <PostForm onPostSubmit={reloadFunction}/>
            <FetchPost reloadTrigger={reloadPost}/>
        </div>
    )
}
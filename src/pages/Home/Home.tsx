import { useState } from "react"
import FetchPost from "./components/FetchPost"
import PostForm from "./components/PostForm"

export default function Home(){
    
    const [reloadPost,setReloadPost] = useState<boolean>(true)
    const reloadFunction = () => {
        setReloadPost(prev=>!prev);
    }
    return(
        <div>
            <PostForm onPostSubmit={reloadFunction}/>
            <FetchPost reloadTrigger={reloadPost}/>
        </div>
    )
}
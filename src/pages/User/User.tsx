import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { userSchema } from "../../schemas/userSchema";
import Navbar from "../../components/Navbar";
import BackArrow from "../Post/components/BackArrow";
import UserInfo from "./components/UserInfo";
import { postSchema } from "../../schemas/postSchema";
import PostMapping from "../Home/components/PostMapping";
import { formatDate } from "../../functions/formatDate";

export default function User(){
    //URL
    const urlUser = 'http://localhost:4000/api/users/'
    const urlPosts = 'http://localhost:4000/api/posts/user/';
    const {id} = useParams();

    //Inicializaciones
    const [user,setUser] = useState<userSchema | null>(null);
    const navigate = useNavigate();
    const [posts,setPosts] = useState<postSchema[]>([]);

    //Get User
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){navigate('/login')}
        axios.get<userSchema>(urlUser+id,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(result=>{
            const data = result.data;
            setUser(data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[]);



    //Get Posts By User
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){navigate('/login')}
        axios.get<postSchema[]>(urlPosts+id,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(result=>{
            const data = result.data;
            setPosts(data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[])

    return(
        <>
            <Navbar/>
            <div className="m-5">
                <BackArrow/>
            </div>
            <div className="row w-100">
                <div className="col-6">
                    <UserInfo user={user}/>
                </div>
                <PostMapping posts={posts} formatDate={formatDate}/>
            </div>
        </>
    )
}
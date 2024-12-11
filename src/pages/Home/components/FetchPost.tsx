import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../../../schemas/postSchema";
import axios from "axios";

export default function FetchPost(){
    //URL
    const url = 'http://localhost:4000/api/posts/page/1';
    //Inicializaciones
    const navigate = useNavigate()
    const [posts,setPosts] = useState<postSchema[]>([]);
    //Get Request
    useEffect(()=>{
        async function getPost(){
            try{
                const token = localStorage.getItem('token');
                
                if (token) {
                    const posts = await axios.get<postSchema[]>(url,{
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    if(Array.isArray(posts.data)){
                        setPosts(posts.data);
                    }
                } else {
                    navigate('/login');
                }
            }
            catch(error){
                console.error(error);
            }
        }
        getPost()
    },[])
    return(
        <>
            {posts.map((post,index)=>(
                <div key={index} className="w-50 bg-light mx-auto p-5 shadow rounded-5 my-5">
                    <div className="d-flex align-items-center mb-3">
                        {post.user?.img?
                        <img
                            style={{
                                width : '40px',
                                height : '40px'
                            }}
                            src=""
                        />
                        :
                        <img
                            style={{
                                width : '40px',
                                height : '40px'
                            }}
                            src="/vite.svg"
                        />
                        }
                        
                        <div className="mx-3">
                            <b>@{post.user?.name}</b>
                        </div>
                    </div>
                    <h6>{post.title}</h6>
                    <p>{post.body}</p>
                    <p className="">{post.created_at}</p>
                </div>
            ))}
        </>
    )
}
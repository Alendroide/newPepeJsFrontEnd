//Importaciones
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSchema } from "../../../schemas/postSchema";
import axios from "axios";
import '../css/styles.css'
//Interface
interface Props {
    reloadTrigger : boolean
}

export default function FetchPost({reloadTrigger} : Props){
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
    },[reloadTrigger])
    return(
        <>
            {posts.map((post,index)=>(
                    <div key={index} className="w-50 bg-light mx-auto p-5 shadow rounded-5 my-5">
                        <Link to={`/post/${post.id}`}>
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
                        {post.img &&
                        <div
                            className="rounded-5 my-4"
                            style={{
                                maxHeight : '60vh',
                                overflow : 'hidden'
                            }}
                        >
                            <img
                                src={post.img}
                                style={{
                                    width : '100%',
                                }}
                            />
                        </div>
                        }
                        <p className="">{post.created_at}</p>
                        </Link>
                    </div>
            ))}
        </>
    )
}
//Importaciones
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSchema } from "../../../schemas/postSchema";
import axios from "axios";
import '../css/styles.css'
import { format } from 'date-fns';
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
    //Date formating
    const formatDate = (date : string) => {
        return format(new Date(date),'hh:mm a | MMMM d, yyyy.');
    }
    //HTML
    return(
        <>
            {posts.map((post,index)=>(
                <div key={index} className="w-50 mx-auto">
                <Link to={`/post/${post.id}`}>
                    <div className="bg-light p-5 shadow rounded-5 my-5">
                        <div className="d-flex align-items-center mb-3">
                            {post.user?.img?
                            <img
                                className="rounded-circle"
                                style={{
                                    width : '40px',
                                    height : '40px'
                                }}
                                src={post.user.img}
                            />
                            :
                            <img
                                className="rounded-circle"
                                style={{
                                    width : '40px',
                                    height : '40px'
                                }}
                                src="/defaultpfp.png"
                            />
                            }
                            
                            <div className="mx-3">
                                <b>@{post.user?.name}</b>
                            </div>
                        </div>
                        <h6
                            style={{
                                wordWrap : 'break-word'
                            }}
                        >{post.title}</h6>
                        <p
                            style={{
                                wordWrap : 'break-word'
                            }}
                        >{post.body}</p>
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
                        <p style={{color:'rgb(115, 115, 115)'}}>{formatDate(post.created_at)}</p>
                    </div>
                </Link>
                </div>
            ))}
        </>
    )
}
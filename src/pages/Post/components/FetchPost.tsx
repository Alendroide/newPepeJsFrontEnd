import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { postSchema } from "../../../schemas/postSchema";
import { format } from "date-fns";

export default function FetchPost(){
    //URL
    const { id } = useParams();
    const url = `http://localhost:4000/api/posts/${id}`
    //Inicializaciones
    const [post,setPost] = useState<postSchema>();
    const navigate = useNavigate()

    useEffect(()=>{
        async function getPost(){
            try{
                const token = localStorage.getItem('token');
                if(token){
                    const fetchedPost = await axios.get<postSchema>(url,{
                        headers : {
                            'Authorization' : `Bearer ${token}`
                        }
                    });
                    setPost(fetchedPost.data);
                }
                else{
                    navigate('/login');
                }
            }
            catch(error){
                console.error(error);
            }
        }
        getPost();
    },[])

    //Date formating
    const formatDate = (date : string) => {
        return format(new Date(date),'hh:mm a | MMMM d, yyyy.');
    }

    //HTML
    return(
        <div>
            {post &&
                <div className="w-50 mx-auto">
                    <div className="bg-light p-5 shadow rounded-5 my-5">
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
                </div>
            }
        </div>
    )
}
import axios from "axios";
import Comment from './Comment';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { postSchema } from "../../../schemas/postSchema";
import { format } from "date-fns";
import PostComment from "./PostComment";

export default function FetchPost(){
    //URL
    const { id } = useParams();
    const url = `http://localhost:4000/api/posts/${id}`
    
    //Inicializaciones
    const [reload,setReload] = useState<boolean>(true);
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
    },[reload])

    //Reload function
    const handleComment = () => {
        setReload(prev => !prev);
    }

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
                            <Link to={`/user/${post.user?.id}`}>
                                {post.user?.img?
                                <img
                                    className="rounded-circle postUserImg"
                                    style={{
                                        width : '40px',
                                        height : '40px'
                                    }}
                                    src={post.user.img}
                                />
                                :
                                <img
                                    className="rounded-circle postUserImg"
                                    style={{
                                        width : '40px',
                                        height : '40px'
                                    }}
                                    src="/defaultpfp.png"
                                />
                                }
                            </Link>
                            <Link to={`/user/${post.user?.id}`}>
                                <div className="mx-3 postUser">
                                    <b>@{post.user?.name}</b>
                                </div>
                            </Link>
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
                        <div className="d-flex">
                            <img
                                className="me-3"
                                src="/commentIcon.svg"
                                alt="commentIcon"
                            />
                            {post._count.comments}
                        </div>
                        
                        <PostComment handleComment={handleComment} />

                        <Comment post={post} formatDate={formatDate} />

                    </div>
                </div>
            }
        </div>
    )
}
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
    const url = 'http://localhost:4000/api/posts/page/';
    //Inicializaciones
    const navigate = useNavigate()
    const [posts,setPosts] = useState<postSchema[]>([]);


    //Infinite Scroll Logic
    const [page,setPage] = useState<number>(1);
    const [loading,setLoading] = useState<boolean>(false);
    const [hasMore,setHasMore] = useState<boolean>(true);

    // Detectar el scroll al final de la página
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        getPost(page,false);
        }
    };

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[loading,page,hasMore]);

    async function getPost(page : number,reload : boolean){
        //Esto evita que, si la página está cargando, o si no hay más elementos, no se ejecute la función
        if(loading || !hasMore) return;
        //GetAll
        setLoading(true);
        try{
            const token = localStorage.getItem('token');
            
            if (token) {
                const posts = await axios.get<postSchema[]>(
                    //URL con la página actual
                    `${url}${page}`
                    ,{
                    //Encabezados de solicitud
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                //Chequea si es una lista (Solicitud correcta) o un objeto (Mensaje del servidor)
                if(Array.isArray(posts.data)){
                    if(reload){
                        setPosts(posts.data);
                    }
                    else{
                        setPosts(prev=>[...prev,...posts.data]);
                    }
                    setPage(prev=>prev+1);
                }
                else{
                    setHasMore(false);
                }
            } else {
                navigate('/login');
            }
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }

    //Get Request
    useEffect(()=>{
        setPage(1);
        setPosts([]);
        getPost(page,true);
    },[reloadTrigger])

    //Date formating
    const formatDate = (date : string) => {
        return format(new Date(date),'hh:mm a | MMMM d, yyyy.');
    }
    //HTML
    return(
        <>
        {`Reload:${reloadTrigger}`}
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
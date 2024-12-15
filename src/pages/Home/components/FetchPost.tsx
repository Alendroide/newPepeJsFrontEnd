//Importaciones
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../../../schemas/postSchema";
import axios from "axios";
import '../css/styles.css'
import {formatDate} from '../../../functions/formatDate';
import PostMapping from "./PostMapping";

//Interface
interface Props {
    reloadTrigger : boolean
}

export default function FetchPost({reloadTrigger} : Props){
    
    //FETCHING URL
    const url = 'http://localhost:4000/api/posts/page/';
    
    //Inicializaciones
    const navigate = useNavigate()
    const [posts,setPosts] = useState<postSchema[]>([]);


    //INFINITE SCROLLING LOGIC
    const [page,setPage] = useState<number>(2);
    const [loading,setLoading] = useState<boolean>(false);
    const [hasMore,setHasMore] = useState<boolean>(true);

    // Detectar el scroll al final de la página
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        getMore(page);
        }
    };

    //LISTENER DEL EVENTO 'SCROLL'
    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[loading,page,hasMore]);

    //GET POSTS

    async function getMore(page : number){
        if(loading || !hasMore) return;
        setLoading(true);
        const token = localStorage.getItem('token');
        if(!token){ navigate('/login'); return; }
        axios.get<postSchema[]>( `${url}${page}`, { headers : { 'Authorization' : `Bearer ${token}` } } )
        .then(result=>{
            const data = result.data;
            if(Array.isArray(data)){
                setPosts(prev=>[...prev,...data]);
                setPage(prev=>prev+1);
            }
            else{
                setHasMore(false);
            }
        })
        .catch(error=>{
            console.error(error);
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    //First Get Request
    useEffect(()=>{
        setPosts([]);
        const token = localStorage.getItem('token');
        if(!token){navigate('/login')};
        axios.get(`${url}1`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(result=>{
            console.log(result)
            if(Array.isArray(result.data)){
                setPosts(result.data);
            }
        })
        .catch(error=>{
            console.log(error);
        })
    },[reloadTrigger])

    //HTML
    return(
        <>
            <PostMapping posts={posts} formatDate={formatDate} />
            {loading && 
                <div className="my-4">
                    Cargando más publicaciones...
                </div>
            }
        </>
    )
}
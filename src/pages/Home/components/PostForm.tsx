//Importaciones
import { useForm } from "react-hook-form"
import { newPostSchema } from "../../../schemas/postSchema"
import axios from "axios"
import { useNavigate } from "react-router-dom";
//Componente
export default function PostForm(){
    //URL
    const url = 'http://localhost:4000/api/posts';
    //Inicializaciones
    const navigate = useNavigate()
    const { register, formState : { errors }, reset, handleSubmit } = useForm<newPostSchema>()
    //Función handleSubmit
    const onSubmit = async(data : newPostSchema) => {
        try{
            const form = new FormData();
            form.append('title',data.title)
            form.append('body',data.body)
            if(data.img){
                form.append('img',data.img[0])
            }
            const token = localStorage.getItem('token');
            if (token) {
                    await axios.post(url,form,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                reset()
            } else {
                navigate('/login');
            }
        }
        catch(error){
            console.error(error)
        }
    }
    //HTML
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("title",{required:true})}
                    type="text"
                />
                {errors.title && <p>{errors.title.message}</p>}
                <textarea
                    {...register("body",{required:true})}
                />
                {errors.body && <p>{errors.body.message}</p>}
                <input
                    {...register("img",{required:false})}
                    type="file"
                />
                <button className="btn btn-outline-info">Post</button>
            </form>
        </>
    )
}
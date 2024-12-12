//Importaciones
import { useForm } from "react-hook-form"
import { newPostSchema } from "../../../schemas/postSchema"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import '../css/styles.css';
//Interface
interface Props {
    onPostSubmit : Function
}
//Componente
export default function PostForm({onPostSubmit} : Props){
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
                reset();
                onPostSubmit();
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
                <div className="mx-auto w-50 border rounded-5 p-3 shadow-sm my-5">
                    <input
                        {...register("title",{required:true})}
                        className="d-block w-100  border-0 border-bottom"
                        type="text"
                        placeholder="Titulo..."
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                    <textarea
                        {...register("body",{required:true})}
                        className="w-100 border-0"
                        style={{
                            resize : 'none'
                        }}
                        placeholder="Qué estás pensando?"
                    />
                    {errors.body && <p>{errors.body.message}</p>}
                    <div className="d-flex align-items-center">
                        <div
                            className="file-upload rounded shadow-sm me-auto"
                            style={{
                                backgroundImage : "url('/camera.svg')",
                                backgroundSize : '80%',
                                backgroundPosition : 'center',
                                backgroundRepeat : 'no-repeat'
                            }}
                        >
                            <input
                                {...register("img",{required:false})}
                                type="file"
                            />
                        </div>
                        <button className="btn btn-outline-info">Post</button>
                    </div>
                </div>
            </form>
        </>
    )
}
//Importaciones
import { useForm } from "react-hook-form"
import { newPostSchema } from "../../../schemas/postSchema"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import '../css/styles.css';
import { useState } from "react";
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
    const { register, formState : { errors }, reset, handleSubmit, setValue } = useForm<newPostSchema>()
    const [preview,setPreview] = useState<string | null>(null);
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
                setPreview(null);
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
    //Función preview
    const handleFilePreview = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
        else{
            setPreview(null);
        }

    }

    const handleCancelUpload = () => {
        setValue("img",undefined);
        setPreview(null);
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
                    {preview && (
                        <div className="my-3">
                            <img
                                style={{
                                    width : '20%',
                                    height : '20%'
                                }}
                                className="rounded-5 shadow"
                                src={preview}
                                alt="preview"
                            />
                            <img
                                onClick={handleCancelUpload}
                                src="/x.svg"
                                alt="X"
                                className="btn btn-danger p-0 mx-3"
                                style={{
                                    width : '30px'
                                }}
                            />
                        </div>
                    )}
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
                                onChange={(e)=>{
                                    handleFilePreview(e)
                                }}
                            />
                        </div>
                        <button className="btn btn-outline-info">Post</button>
                    </div>
                </div>
            </form>
        </>
    )
}
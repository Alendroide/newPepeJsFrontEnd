import { useForm } from "react-hook-form"
import { newCommentSchema } from "../../../schemas/commentSchema"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

interface Props {
    handleComment : Function
}

export default function PostComment({ handleComment } : Props){
    //URLs
    const { id } = useParams();
    const url = `http://localhost:4000/api/comment/${id}`;

    //Inicializaciones
    const { register, formState : { errors }, reset, handleSubmit } = useForm<newCommentSchema>();
    const navigate = useNavigate()
    const [length,setLength] = useState<number>(0);

    //Envío de la solicitud POST
    const onSubmit = async(data : newCommentSchema) => {
        try{
            const token = localStorage.getItem('token');
            console.log(data);
            if(token){
                await axios.post(url,{
                    comment : data.comment
                },{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                });
            }
            else{
                navigate('/login');
            }
            setLength(0);
            handleComment();
            reset();
        }
        catch(error){
            console.error(error);
        }
    }

    //HTML
    return(
        <div
            className="mb-3 mt-4 w-100 shadow-sm rounded-5 p-4"
            style={{
                backgroundColor : 'white',
                minHeight : '10vh'
            }}
        >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        {...register("comment", { required: true })}
                        onInput={(e)=>{
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                            setLength(target.value.length);
                        }}
                        style={{
                            resize : 'none',
                            width : '100%',
                        }}
                        className="border-0"
                        placeholder="Escribe un comentario..."
                        maxLength={190}
                    />
                    {errors.comment && <p>{errors.comment.message}</p>}
                    <div className="d-flex">
                        {length == 190 ?
                        <p
                            style={{
                                color : '#ff0f0f'
                            }}
                        >Longitud máxima</p>
                        :
                        <p
                            style={{
                                color : '#c0c0c0'
                            }}
                        >{length}/190</p>
                        }
                        <button
                            type="submit"
                            className="btn btn-outline-info ms-auto"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            

        </div>
    )
}
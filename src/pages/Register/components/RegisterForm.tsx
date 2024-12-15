import { useForm } from "react-hook-form"
import { registerSchema } from "../../../schemas/registerSchema"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/styles.css"

export default function RegisterForm(){
    //URL
    const url = 'http://localhost:4000/api/register';
    //Inicializaciones
    const { register, formState : { errors }, reset, handleSubmit } = useForm<registerSchema>();
    const navigate = useNavigate()
    const [pfp,setPfp] = useState<string | null>(null);

    //Image preview
    const handleImg = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]? e.target.files[0] : null;
        if(file){
            const obj = URL.createObjectURL(file);
            setPfp(obj);
        }
    }

    //Función handleSubmit
    const onSubmit = async(data : registerSchema) => {
        try{
            const form = new FormData();
            form.append('name',data.name);
            form.append('bio',data.bio);
            form.append('email',data.email);
            form.append('password',data.password);
            if(data.img){
                form.append('img',data.img[0]);
            }
            await axios.post(url,form);
            alert('Registrado exitosamente!');
            navigate('/login');
            reset();
        }
        catch(error){
            console.error(error);
        }
    }
    return(
        <div className="w-50 bg-light mx-auto rounded-5 shadow p-5 my-5">
            <h2>Registrate</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="my-4 w-75">
                            <input
                                {...register("name")}
                                className="form-control"
                                type="text"
                                placeholder="@Nombre"
                                maxLength={20}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="my-4 w-100">
                            <textarea
                                {...register("bio")}
                                className="form-control"
                                placeholder="Me gusta la Coca-Cola!"
                                maxLength={190}
                            />
                            {errors.bio && <p>{errors.bio.message}</p>}
                        </div>
                        <div className="my-4 w-100">
                            <input
                                {...register("email")}
                                className="form-control"
                                type="email"
                                placeholder="emailejemplo@email.com"
                                maxLength={40}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className="my-4 w-75">
                            <input
                                {...register("password")}
                                className="form-control"
                                type="password"
                                placeholder="********"
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <p className="my-3">
                            Ya tienes una cuenta? <Link to={'/login'}><span className="text-primary">Inicia sesión</span></Link>
                        </p>
                    </div>
                    <div className="col-6">
                        <h5>Foto de perfil:</h5>

                        <div className="my-5 d-flex justify-content-center">
                            {pfp ?
                            <div
                                className="pfp-upload addpfp rounded-circle"
                                style={{
                                    backgroundImage : `url('${pfp}')`,
                                    backgroundSize : 'cover',
                                    backgroundPosition : 'center'
                                }}
                            >
                                <input
                                    {...register("img")}
                                    type="file"
                                    onChange={(e)=>{
                                        handleImg(e)
                                    }}
                                />
                            </div>
                            :
                            <div
                                className="pfp-upload addpfp rounded-circle"
                                style={{
                                    backgroundImage : "url('/addpfp.png')",
                                }}
                            >
                                <input
                                    {...register("img")}
                                    type="file"
                                    onChange={(e)=>{
                                        handleImg(e)
                                    }}
                                />
                            </div>
                            }
                        </div>
                        
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-info">
                    Register
                </button>
            </form>
        </div>
    )
}
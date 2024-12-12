//Importaciones
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/loginSchema";
import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//Componente
export default function Login(){
    //URL para iniciar sesión
    const url = 'http://localhost:4000/api/login';
    //Errores
    const [emailErr, setEmailErr] = useState<string>('');
    const [passErr, setPassErr] = useState<string>('');
    //Inicializaciones
    const navigate = useNavigate();
    const { register, formState : { errors }, reset, handleSubmit } = useForm<loginSchema>();
    //Función handleSubmit
    const onSubmit = async(data : loginSchema) => {
        setEmailErr('');
        setPassErr('');
        try{
            const response = await axios.post(url,data);
            localStorage.setItem('token',response.data.token);
        }
        catch(error : any){
            if(error.response){
                if(error.response.status == 404) return setEmailErr('Usuario desconocido');
                if(error.response.status == 401) return setPassErr('Contraseña incorrecta');
            }
        }
        reset();
        navigate('/');
    }
    //HTML
    return(
        <div className="w-50 mx-auto bg-light shadow-lg p-5 rounded-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Iniciar sesión</h2>
                <div className="row">
                    <div className="col col-3 col-lg-6 col-sm-12">
                        <div className="my-4">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                {...register("email")}
                                className="form-control"
                                type="email"
                                autoComplete="off"
                                placeholder="emailejemplo@email.com"
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                            {emailErr && <p>{emailErr}</p>}
                        </div>
                        <div className="my-4">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                {...register("password")}
                                className="form-control"
                                type="password"
                                placeholder="********"
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                            {passErr && <p>{passErr}</p>}
                            <p className="my-3">
                                No tienes una cuenta? <Link to={'/register'}>Regístrate aquí</Link>
                            </p>
                        </div>
                        <button type="submit" className="btn btn-outline-info">Log In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
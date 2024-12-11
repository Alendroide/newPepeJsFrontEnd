import { useForm } from "react-hook-form"
import { registerSchema } from "../../schemas/registerSchema"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register(){
    //URL
    const url = 'http://localhost:4000/api/register';
    //Inicializaciones
    const { register, formState : { errors }, reset, handleSubmit } = useForm<registerSchema>();
    const navigate = useNavigate()
    //Función handleSubmit
    const onSubmit = async(data : registerSchema) => {
        try{
            await axios.post(url,data);
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
                <div className="my-4 w-25">
                    <input
                        {...register("name")}
                        className="form-control"
                        type="text"
                        placeholder="@Nombre"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="my-4 w-50">
                    <textarea
                        {...register("bio")}
                        className="form-control"
                        placeholder="Me gusta la Coca-Cola!"
                    />
                    {errors.bio && <p>{errors.bio.message}</p>}
                </div>
                <div className="my-4 w-25">
                    <input
                        {...register("email")}
                        className="form-control"
                        type="email"
                        placeholder="emailejemplo@email.com"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="my-4 w-25">
                    <input
                        {...register("password")}
                        className="form-control"
                        type="password"
                        placeholder="********"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <p className="my-3">
                    Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión</Link>
                </p>
                <button type="submit" className="btn btn-outline-info">
                    Register
                </button>
            </form>
        </div>
    )
}
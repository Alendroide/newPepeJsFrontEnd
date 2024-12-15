import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { userSchema } from "../../schemas/userSchema";
import Navbar from "../../components/Navbar";
import BackArrow from "../Post/components/BackArrow";

export default function User(){
    //URL
    const url = 'http://localhost:4000/api/users/'
    const {id} = useParams();
    //Inicializaciones
    const [user,setUser] = useState<userSchema | null>(null)
    const navigate = useNavigate();
    //Get User
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){navigate('/login')}
        axios.get<userSchema>(url+id,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(result=>{
            const data = result.data;
            setUser(data);
        })
        .catch(error=>{
            console.error(error);
        })
    },[])
    return(
        <>
            <Navbar/>
            <BackArrow/>
            {user &&
                <div className="m-5 bg-light p-5 shadow rounded-5 w-50">
                    <div className="d-flex justify-content-center my-4">
                        <img
                            style={{
                                width : '300px',
                                height : '300px'
                            }}
                            className="rounded-circle shadow"
                            src={user.img}
                            alt="userImg"
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3>@{user.name}</h3>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <p className="fs-4"><i>"{user.bio}"</i></p>
                    </div>
                </div>
            }
        </>
    )
}
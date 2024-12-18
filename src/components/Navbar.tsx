import { Link, useNavigate } from "react-router-dom";
import '../css/Navbar.css';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { userSchema } from "../schemas/userSchema";

export default function Navbar(){
    //Inicializaciones
    const navigate = useNavigate()
    const [user,setUser] = useState<userSchema>()


    useEffect(()=>{
        const token = localStorage.getItem('token')? localStorage.getItem('token') : null;
        if(!token){
            navigate('/login');
        }
        else{
            const userData = jwtDecode<userSchema>(token);
            setUser(userData);
        }
    },[])


    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <div
            className="d-flex align-items-center bg-light shadow"
            style={{
                minHeight : '6vh',
            }}
        >
            <div className="me-auto py-2">
                <Link to={'/'} className="d-flex align-items-center">
                    <img
                        style={{
                            width : '40px'
                        }}
                        className="ms-3 logoNewPepeJs"
                        src="/newPepe.png"
                        alt="logo"
                    />
                    <h6 className="m-0 p-0 mx-3">newPepeJs</h6>
                </Link>
            </div>
            <div className="d-flex align-items-center">
                <Link to={`/user/${user?.id}`}>
                    <div className="mx-3 postUser">
                        <b>@{user?.name}</b>
                    </div>
                </Link>
                <Link to={`/user/${user?.id}`}>
                    {user?.img?
                    <img
                        className="rounded-circle postUserImg"
                        style={{
                            width : '40px',
                            height : '40px'
                        }}
                        src={user.img}
                    />
                    :
                    <img
                        className="rounded-circle postUserImg"
                        style={{
                            width : '40px',
                            height : '40px'
                        }}
                        src="/defaultpfp.png"
                    />
                    }
                </Link>
            </div>

            <h6 onClick={handleLogOut} className="btn btn-outline-danger p-1 m-0 mx-3 d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-power powerOff" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z"/>
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                </svg>
            </h6>
        </div>
    )
}
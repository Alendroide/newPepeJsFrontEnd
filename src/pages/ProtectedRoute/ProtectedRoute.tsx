import { ReactNode } from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({children} : Props){
    const url = 'http://localhost:4000/api/auth';
    const navigate = useNavigate();

    useEffect(()=>{
        async function validate(){
            try{
                //Obtención de token
                const token = localStorage.getItem('token');

                if (token) {
                    await axios.post(url, null, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                } else {
                    navigate('/login');
                }
            }
            catch(error){
                navigate('/login');
            }
        }
        validate()
    },[])
    return(
        <>
            {children}
        </>
    )
}
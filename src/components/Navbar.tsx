import { Link, useNavigate } from "react-router-dom";
import '../css/Navbar.css';

export default function Navbar(){
    const navigate = useNavigate()
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
            <h6 onClick={handleLogOut} className="btn btn-outline-danger p-0 px-2 m-0 mx-3">Log off</h6>
        </div>
    )
}
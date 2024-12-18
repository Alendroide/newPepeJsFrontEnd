import { userSchema } from "../../../schemas/userSchema"

interface Props {
    user : userSchema | null
}
export default function UserInfo({user} : Props){
    return(
        <>
            {user &&
                <div className="m-5 bg-light p-5 shadow rounded-5">
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
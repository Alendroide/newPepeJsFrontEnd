import { Link } from "react-router-dom";
import { postSchema } from "../../../schemas/postSchema";

interface Props {
    post : postSchema,
    formatDate : Function
}

export default function Comment({ post, formatDate } : Props){  
    return(
        <>
            {post.comments.map((comment,index)=>(
                <div
                    key={index}
                    className="shadow p-4 rounded-5 pb-2 my-4"
                    style={{
                        backgroundColor : 'white'
                    }}
                >
                    <div className="d-flex align-items-center mb-3">
                        <Link to={`/user/${comment.user?.id}`}>
                            {comment.user.img?
                            <img
                                className="rounded-circle postUserImg"
                                style={{
                                    width : '25px',
                                    height : '25px'
                                }}
                                src={comment.user.img}
                            />
                            :
                            <img
                                className="rounded-circle postUserImg"
                                style={{
                                    width : '25px',
                                    height : '25px'
                                }}
                                src="/defaultpfp.png"
                            />
                            }
                        </Link>
                        <Link to={`/user/${comment.user?.id}`}>
                        <div className="mx-3 postUser">
                            <b>@{comment.user.name}</b>
                        </div>
                        </Link>
                    </div>
                    <p
                        style={{
                            overflowWrap: "break-word"
                        }}
                    >{comment.comment}</p>
                    <p style={{color:'rgb(115, 115, 115)'}}>{formatDate(comment.created_at)}</p>
                </div>
            ))}
        </>
    )
}
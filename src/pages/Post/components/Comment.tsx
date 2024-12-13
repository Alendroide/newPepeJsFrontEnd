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
                        {comment.user.img?
                        <img
                            style={{
                                width : '25px',
                                height : '25px'
                            }}
                            src=""
                        />
                        :
                        <img
                            style={{
                                width : '25px',
                                height : '25px'
                            }}
                            src="/vite.svg"
                        />
                        }
                        
                        <div className="mx-3">
                            <b>@{comment.user.name}</b>
                        </div>
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
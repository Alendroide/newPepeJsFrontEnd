import { Link } from "react-router-dom"
import { postSchema } from "../../../schemas/postSchema"

interface Props {
    posts : postSchema[],
    formatDate : Function
}

export default function PostMapping({ posts, formatDate }: Props ){
    return(
        <>
            {posts.map((post,index)=>(
                <div key={index} className="w-50 mx-auto">
                <Link to={`/post/${post.id}`}>
                    <div className="bg-light p-5 shadow rounded-5 my-5">
                        <div className="d-flex align-items-center mb-3">
                            <Link to={`/user/${post.user?.id}`}>
                                {post.user?.img?
                                <img
                                    className="rounded-circle postUserImg"
                                    style={{
                                        width : '40px',
                                        height : '40px'
                                    }}
                                    src={post.user.img}
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
                            <div className="mx-3">
                                <Link to={`/user/${post.user?.id}`}>
                                    <b className="postUser">@{post.user?.name}</b>
                                </Link>
                            </div>
                        </div>
                        <h6
                            style={{
                                wordWrap : 'break-word'
                            }}
                        >{post.title}</h6>
                        <p
                            style={{
                                wordWrap : 'break-word'
                            }}
                        >{post.body}</p>
                        {post.img &&
                        <div
                            className="rounded-5 my-4"
                            style={{
                                maxHeight : '60vh',
                                overflow : 'hidden'
                            }}
                        >
                            <img
                                src={post.img}
                                style={{
                                    width : '100%',
                                }}
                            />
                        </div>
                        }
                        <p style={{color:'rgb(115, 115, 115)'}}>{formatDate(post.created_at)}</p>
                        <div className="d-flex">
                            <img
                                className="me-3"
                                src="/commentIcon.svg"
                                alt="commentIcon"
                            />
                            {post._count.comments}
                        </div>
                    </div>
                </Link>
                </div>
            ))}
        </>
    )
}
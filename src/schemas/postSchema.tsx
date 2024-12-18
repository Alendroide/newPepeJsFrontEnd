import { commentSchema } from './commentSchema'

export interface postSchema {
    id? : number,
    title : string,
    body : string,
    img? : string,
    created_at : string,
    comments : commentSchema[],
    user? : {
        id : number,
        name : string,
        img? : string
    },
    _count : {
        comments : number
    }
}

export interface newPostSchema {
    title : string,
    body : string,
    img? : FileList
}
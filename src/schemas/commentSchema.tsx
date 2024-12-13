export interface commentSchema {
    comment : string,
    created_at : string,
    user : {
        id : number,
        name : string,
        img? : string
    }
}

export interface newCommentSchema {
    comment : string
}
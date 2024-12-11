export interface postSchema {
    id? : number,
    title : string,
    body : string,
    img? : string,
    created_at : string,
    user? : {
        id : number,
        name : string,
        img? : string
    }
}
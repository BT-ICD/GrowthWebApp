export interface IUserDetail {
    userName:string,
    role:string
}
export interface ILoginModel{
    userName:string,
    password:string
}
export interface ITokenModel{
    token:string,
    expiration:Date,
    role:string
}
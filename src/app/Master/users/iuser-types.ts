export interface IAppUserDTOList {
    userName:string,
    email:string
}
export interface IAppUser{
    userName:string,
    email:string
    userPassword:string
}
export interface IAppUserListResolve{
    users:IAppUserDTOList[],
    error?:string
}
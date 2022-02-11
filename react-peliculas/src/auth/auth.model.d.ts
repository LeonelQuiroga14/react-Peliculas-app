export interface claim{
    name:string;
    value:string;
}
export interface UserCredentials{
    email:string;
    password:string;
}
export interface AuthenticationResponse{
    token:string;
    expirationDate:Date;
}
export interface UsuarioDTO{
    id:string;
    email:string;
}
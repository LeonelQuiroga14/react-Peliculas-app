export interface ActorCreacionDTO{
    name:string;
    birthDate?:Date;
    photo?:File;
    photoURL?:string;
    biography?:string;
}
export interface ActorPeliculaDTO{
    id:number;
    name:string;
    character:string;
    photo?:string;
}
export interface ActorDTO{

    id:number;
    name:string;
    biography:string;
    birthDate:Date;
    photo:string;
}
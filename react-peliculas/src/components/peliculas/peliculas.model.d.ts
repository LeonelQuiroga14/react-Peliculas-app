import { ActorDTO, ActorPeliculaDTO } from "../actores/actores.model";
import { CineDTO } from "../cines/cines.model";
import { GeneroDTO } from "../generos/generos.model";

export interface PeliculaDTO{

    id:number;
    title:string;
    poster:string;
    description?:string;
    resume:string;
    premiereDate:Date;
    inCinema:boolean;
    trailer?:string;
    genders:GeneroDTO[];
    cinemas:CineDTO[];
    actors:ActorPeliculaDTO[];
    averageVotes:number;
    userVote?:number;

}

export interface LandingPageDTO{
    nextReleases?:PeliculaDTO[];
    inCinemas?:PeliculaDTO[];
}

export interface PeliculaCreacionDTO{
  
    title:string;
    inCinema:boolean;
    description?:string
    premiereDate?:Date;
    poster?:string;
    resume?:string;
    posterURL?:string;
    trailer?:string;
    genderIds?:number[];
    cinemaIds?:number[];
    actors?:ActorPeliculaDTO[];


}

export interface PeliculaPostGetDTO{

    genders:GeneroDTO[];
    cinemas:CineDTO[];
}

export interface PeliculaPutGetDTO{

     movie: PeliculaDTO;
     unSelectedGenders:GeneroDTO[];
     selectedGenders:GeneroDTO[];
     unSelectedCinemas:CineDTO[];
     selectedCinemas:CineDTO[];
     actors: ActorPeliculaDTO[];
}
import React,{useState,useEffect} from 'react'
import { LandingPageDTO } from './peliculas/peliculas.model';
import { ListadoPeliculas } from "./peliculas/ListadoPeliculas"
import axios, { AxiosResponse } from 'axios';
import { urlMovies } from '../utils/endpoints/endpoints';
import AlertaContext from '../contexts/AlertaContext';
import {Autorizado} from '../../src/auth/Autorizado'
export const LandingPage = () => {
    const [peliculas, setPeliculas] = useState<LandingPageDTO>({})
    useEffect(() => {
  
      loadingData();
     
    },[])

    const loadingData =()=>{
      axios.get(`${urlMovies}/Landing`)
      .then((response:AxiosResponse<LandingPageDTO>)=>{
           setPeliculas(response.data)
      })

    }
    return (
        <>
        <Autorizado 
        autorizado={<>Autorizado</>}

        noAutorizado={<>No Autorizado</>}
        />
        <AlertaContext.Provider value={()=> loadingData()}>

              <h3>En cartelera</h3>
              <ListadoPeliculas peliculas={peliculas.inCinemas} />


              <h3>Próximos estrenos</h3>
              <ListadoPeliculas peliculas={peliculas.nextReleases} />
        </AlertaContext.Provider>
        </>
    )
}

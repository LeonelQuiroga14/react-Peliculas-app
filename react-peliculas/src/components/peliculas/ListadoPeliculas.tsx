import React from 'react'
import { PeliculaDTO } from './peliculas.model'
import { PeliculaIndividual } from './PeliculaIndividual'
import css from './listadoPeliculas.module.css';
import {ListadoGenerico} from '../../utils/ListadoGenerico';
export const ListadoPeliculas = (props: listadoPeliculasProps) => {

    
        return (

            <ListadoGenerico listado={props.peliculas}
           >
              <div className={css.div}>
                {
                    props.peliculas?.map(pelicula => <PeliculaIndividual pelicula={pelicula} key={pelicula.id} />)
                }
            </div>
            </ListadoGenerico>
           
        )
    
}

interface listadoPeliculasProps {

    peliculas?: PeliculaDTO[];
}
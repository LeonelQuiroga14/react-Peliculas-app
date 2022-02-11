import React, { useContext } from 'react'
import { PeliculaDTO } from './peliculas.model'
import css from './peliculaIndividual.module.css';
import { Link } from 'react-router-dom';
import { Button } from '../../utils/Button';
import confirmar from '../../utils/Confirmar';
import axios from 'axios';
import { urlMovies } from '../../utils/endpoints/endpoints';
import AlertaContext from '../../contexts/AlertaContext'
import { Autorizado } from '../../auth/Autorizado';
export const PeliculaIndividual = (props: PeliculaIndividualProps) => {

    const alerta = useContext(AlertaContext)
    const construirLink = () => `/peliculas/detalle/${props.pelicula.id}`
    const handleDelete = () => {
        axios.delete(`${urlMovies}/${props.pelicula.id}`)
            .then(() => {
                alerta();

            })
    }
    return (
        <div className={css.div}>
            <Link to={construirLink()}>
                <img src={props.pelicula.poster} alt="Poster" />
            </Link>
            <p><Link to={construirLink()}>{props.pelicula.title}</Link></p>
            <Autorizado
                role="Admin"
                autorizado={<div>
                    <Link style={{ marginRight: "1rem" }}
                        className="btn btn-info" to={`/peliculas/editar/${props.pelicula.id}`}
                    >Editar</Link>
                    <Button
                        onClick={() => confirmar(() => handleDelete())}
                        className='btn btn-danger'>Borrar</Button>
                </div>}
            />

        </div>
    )
}



interface PeliculaIndividualProps {

    pelicula: PeliculaDTO;

}
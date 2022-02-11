import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { Link, useParams } from 'react-router-dom'
import { urlMovies, urlRating } from '../../utils/endpoints/endpoints';
import { PeliculaDTO } from './peliculas.model';
import { Cargando } from '../../utils/Cargando';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Mapa } from '../../utils/mapa/Mapa';
import { CoordenadaDTO } from '../../utils/mapa/coordenadas.model';
import Rating from '../../utils/Rating'
import Swal from 'sweetalert2';
export const DetallePelicula = (props: detallePeliculaProps) => {
    const { id }: any = useParams();
    const [movie, setMovie] = useState<PeliculaDTO>()
    useEffect(() => {

        axios.get(`${urlMovies}/Detail/${id}`)
            .then((response: AxiosResponse<PeliculaDTO>) => {
                response.data.premiereDate = new Date(response.data.premiereDate);
                setMovie(response.data);
            })
    }, [])

    const generateUrlYTembedded = (url: string): string => {
        if (!url) return '';
        var video_id = url.split('v=')[1];
        var positionAmpersand = video_id.indexOf('&')
        if (positionAmpersand !== -1) {
            video_id = video_id.substring(0, positionAmpersand);

        }
        return `https://www.youtube.com/embed/${video_id}`
    }

    const transformCoordenates = (): CoordenadaDTO[] => {

        if (movie?.cinemas) {
            const coordenadas = movie.cinemas.map(cinema => {
                return {
                    lat: cinema.latitude,
                    lng: cinema.longitude,
                    name: cinema.name
                } as CoordenadaDTO
            })
            return coordenadas;
        }
        return [];
    }

    const onVote =async (vote :number) =>{
        await axios.post(urlRating,{
            score:vote,
            movieId:id
        });
        Swal.fire({
            title:"Voto recibido",
            icon:"success"
        })

    }

    return (
        movie ? <div style={{ display: "flex" }}>
            <div>
                <h2>{movie.title} ({movie.premiereDate.getFullYear()})</h2>
                {movie.genders?.map((genero) => (
                    <Link key={genero.id} style={{ marginRight: "5px" }}
                        className='btn btn-primary btn-sm rounded-pill '
                        to={`/peliculas/filtrar?generoId=${genero.id}`}
                    >
                        {genero.name}
                    </Link>
                ))}
                | {movie.premiereDate.toDateString()}
                | Voto promedio: {movie.averageVotes}
                | Tu voto: <Rating 
                maxValue={5}
                onChange={onVote}
                selectedValue={movie.userVote!}
                />

                <div style={{ display: 'flex', marginTop: "1rem" }}>
                    <span style={{ display: 'inline-block', marginRight: "1rem" }}>
                        <img src={movie.poster} style={{ width: "225px", height: "315px" }}
                            alt={movie.title}
                        />
                    </span>

                    {movie.trailer &&
                        <div>
                            <iframe
                                title='youtube-trailer'
                                width="560"
                                height="315"
                                src={generateUrlYTembedded(movie.trailer)}
                                frameBorder={0}
                                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
                                allowFullScreen
                            >

                            </iframe>
                        </div>

                    }



                </div>
                {movie.resume &&
                    <div style={{ marginTop: "1rem" }}>
                        <h3>Resumen</h3>
                        <div>

                            <ReactMarkdown>
                                {movie.resume}
                            </ReactMarkdown>
                        </div>

                    </div>}

                {movie.actors && movie.actors.length > 0 &&
                    <div style={{ marginTop: "1rem" }}>
                        <h3>Actores</h3>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {movie.actors.map(actor => (
                                <div key={actor.id} style={{ marginBottom: "2px" }}>
                                    <img alt='foto' src={actor.photo}
                                        style={{ width: "50px", verticalAlign: "middle" }}
                                    />
                                    <span style={{
                                        display: "inline-block", width: "200px",
                                        marginLeft: "1rem"
                                    }}>
                                        {actor.name}
                                    </span>
                                    <span style={{ display: "inline-block", width: "45px" }}>
                                        ...
                                    </span>
                                    <span>{actor.character}</span>
                                </div>
                            ))}
                        </div>
                    </div>}

                {movie.cinemas && movie.cinemas.length > 0 &&
                    <div>
                        <h2>Mostrandose en los siguientes cines</h2>
                        <Mapa  readOnly={true}
                         coordenadas={transformCoordenates()}/>
                    </div>
                }
            </div>

        </div> : <Cargando />
    )
}

interface detallePeliculaProps {


}

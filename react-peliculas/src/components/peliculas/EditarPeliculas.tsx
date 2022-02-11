import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Cargando } from '../../utils/Cargando'
import { urlMovies } from '../../utils/endpoints/endpoints'
import { convertPeliculaToFormData } from '../../utils/form/FormDataUtils'
import { ListadoErrores } from '../../utils/form/ListadoErrores'
import { FormularioPelicula } from './FormularioPeliculas'
import { PeliculaCreacionDTO, PeliculaPutGetDTO } from './peliculas.model'

export const EditarPeliculas = () => {
    const { id }: any = useParams()
    const [errores, SetErrores] = useState([])
    const history = useHistory();
    const [pelicula, setPelicula] = useState<PeliculaCreacionDTO>();
    const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculaPutGetDTO>();

    useEffect(() => {
        axios.get(`${urlMovies}/PutGet/${id}`)
            .then((response: AxiosResponse<PeliculaPutGetDTO>) => {
                const { movie } = response.data;
                const modelo: PeliculaCreacionDTO = {
                    title: movie.title,
                    inCinema: movie.inCinema,
                    resume: movie.resume,
                    trailer: movie.trailer,
                    posterURL: movie.poster,
                    premiereDate: new Date(movie.premiereDate),
                    description: movie.description
                }
                setPelicula(modelo);
                setPeliculaPutGet(response.data);

            })
    }, [])

    const editar = async (movie: PeliculaCreacionDTO) => {
        try {
            const data = convertPeliculaToFormData(movie)
            await axios({
                method: "PUT",
                url: `${urlMovies}/${id}`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }

            })
            history.push("/peliculas")
        } catch (error) {
                    
        SetErrores(error.response.data)}
    }

    return (
        <div>
            <h3>
                Editar Pelicula
            </h3>
            <ListadoErrores errores={errores}/>
            {pelicula && peliculaPutGet ?
                <FormularioPelicula
                    generosNoSeleccionados={peliculaPutGet.unSelectedGenders}
                    generosSeleccionados={peliculaPutGet.selectedGenders}
                    cinesSeleccionados={peliculaPutGet.selectedCinemas}
                    actoresSeleccionados={peliculaPutGet.actors}
                    cinesNoSeleccionados={peliculaPutGet.unSelectedCinemas}
                    modelo={pelicula}
                    onSubmit={async valores => await editar(valores)}
                /> : <Cargando />
            }
        </div>
    )
}

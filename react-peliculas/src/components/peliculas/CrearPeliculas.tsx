import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cargando } from '../../utils/Cargando'
import { urlMovies } from '../../utils/endpoints/endpoints'
import { convertPeliculaToFormData } from '../../utils/form/FormDataUtils'
import { ListadoErrores } from '../../utils/form/ListadoErrores'
import { CineDTO } from '../cines/cines.model'
import { GeneroDTO } from '../generos/generos.model'
import { FormularioPelicula } from './FormularioPeliculas'
import { PeliculaCreacionDTO, PeliculaPostGetDTO } from './peliculas.model'
export const CrearPeliculas = () => {
    const history = useHistory();
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<GeneroDTO[]>([])
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<CineDTO[]>([])
    const [cargado, setCargado] = useState(false);
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {

        axios.get(`${urlMovies}/PostGet`)
            .then((response: AxiosResponse<PeliculaPostGetDTO>) => {

                setGenerosNoSeleccionados(response.data.genders);
                setCinesNoSeleccionados(response.data.cinemas);
                setCargado(true);
            })
    }, [])


    const crear = async (pelicula: PeliculaCreacionDTO) => {
        try {
            console.log('crear',pelicula)
            const formData = convertPeliculaToFormData(pelicula)
         axios({
                method: "POST",
                url: urlMovies,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response: AxiosResponse<number>) => {

                history.push(`/peliculas/${response.data}`)
            })
        } catch (error) {
             console.log(errores)
            setErrores(error.response.data)
        }

    }
    return (
        <div>
            <h3>Crear Pelicula</h3>
            <ListadoErrores errores={errores}/>
            {
                cargado ? <FormularioPelicula
                    generosNoSeleccionados={generosNoSeleccionados}
                    generosSeleccionados={[]}
                    cinesSeleccionados={[]}
                    cinesNoSeleccionados={cinesNoSeleccionados}
                    actoresSeleccionados={[]}
                    modelo={{
                        title: '',
                        inCinema: false,
                        trailer: '',
                        

                    }}
                    onSubmit={async (valores)=> await crear(valores)}
                /> : <Cargando />
            }

        </div>
    )
}

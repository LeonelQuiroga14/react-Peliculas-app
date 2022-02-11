import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { urlCinemas } from "../../utils/endpoints/endpoints"
import { ListadoErrores } from "../../utils/form/ListadoErrores"
import { FormularioCine } from "../cines/FormularioCine"
import { cinesCreacionDTO } from "./cines.model"

export const CrearCines = () => {

    const history = useHistory();
    const [errores, setErrores] = useState([])
    const crear = async (cine: cinesCreacionDTO) => {

        try {
            await axios.post(urlCinemas, cine);
            history.push("/cines")
        } catch (error) {
           setErrores(error.response.data);
        }
    }

    return (
        <div>
            <h3>Crear Cine</h3>
            <ListadoErrores errores={errores}/>

            <FormularioCine
                onSubmit={async (valores, acciones) =>
                     await crear(valores)}
                modelo={{ name: '', latitude: 0, longitude: 0 }}

            />
        </div>
    )
}

import axios from 'axios'
import React, { useState } from 'react'
import { FormularioActores } from '../actores/FormularioActores'
import { ActorCreacionDTO } from './actores.model'
import { urlActors } from '../../utils/endpoints/endpoints'
import { useHistory } from 'react-router-dom'
import { convertActorToFormData } from '../../utils/form/FormDataUtils'
import { ListadoErrores } from '../../utils/form/ListadoErrores'
export const CrearActores = () => {

    const history = useHistory();
    const [errores, setErrores] = useState();
    const crear = async (actor: ActorCreacionDTO) => {
        try {
            const formData = convertActorToFormData(actor)
            await axios({
                method: 'POST',
                url: urlActors,
                data: formData,
                headers: {
                    'Content-Type': "multipart/form-data"
                }

            });
            history.push('/actores')
        } catch (error) {
            console.log(error)
            setErrores(error.response.data)
        }
    }

    return (
        <div>
            <h3>Crear Actor</h3>
            <ListadoErrores errores={errores} />
            <FormularioActores
                modelo={{
                    name: "",
                    birthDate: undefined
                }}
                onSubmit={async (valores) => {
                    await crear(valores);
                }}
            />
        </div>
    )
}


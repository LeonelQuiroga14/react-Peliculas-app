import React from 'react'
import { urlGeneros } from '../../utils/endpoints/endpoints'
import { IndiceEntidad } from '../../utils/IndiceEntidad'
import { GeneroDTO } from './generos.model'
export const GenerosIndex = () => {

    return (
        <div>
            <IndiceEntidad<GeneroDTO>
                url={urlGeneros} urlCreacion='generos/crear'
                titulo='Géneros' nombreEntidad='Género'>
                {
                    (generos, botones) => <>
                        <thead>

                            <tr>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos?.map(genero => <tr key={genero.id}>
                                <td>
                                    {botones(`generos/editar/${genero.id}`, genero.id)}
                                </td>
                                <td>
                                    {genero.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>

                }

            </IndiceEntidad>

        </div>
    )
}

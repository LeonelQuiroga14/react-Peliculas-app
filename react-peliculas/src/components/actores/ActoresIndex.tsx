import React from 'react'
import { urlActors } from '../../utils/endpoints/endpoints'
import { IndiceEntidad } from '../../utils/IndiceEntidad'
import { ActorDTO } from './actores.model'
export const ActoresIndex = () => {
    return (
        <div>
            <IndiceEntidad<ActorDTO>
                 url={urlActors} urlCreacion='actores/crear'
                 titulo='Actores' nombreEntidad='Actor'
                >
                  {
                    (actors, botones) => <>
                        <thead>

                            <tr>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actors?.map(actor => <tr key={actor.id}>
                                <td>
                                    {botones(`actores/editar/${actor.id}`, actor.id)}
                                </td>
                                <td>
                                    {actor.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>

                }


                </IndiceEntidad>     
                    </div>
    )
}

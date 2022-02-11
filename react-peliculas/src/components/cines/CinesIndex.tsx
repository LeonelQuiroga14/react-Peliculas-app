import { urlCinemas } from '../../utils/endpoints/endpoints'
import { IndiceEntidad } from '../../utils/IndiceEntidad'
import { CineDTO } from './cines.model'

export const CinesIndex = () => {
    return (
        <>
         <IndiceEntidad<CineDTO>
                url={urlCinemas} urlCreacion='cines/crear'
                titulo='Cines' nombreEntidad='Cine'>
                {
                    (cines, botones) => <>
                        <thead>

                            <tr>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cines?.map(cine => <tr key={cine.id}>
                                <td>
                                    {botones(`cines/editar/${cine.id}`, cine.id)}
                                </td>
                                <td>
                                    {cine.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>

                }

            </IndiceEntidad>

         </>
    )
}

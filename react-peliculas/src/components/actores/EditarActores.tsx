import { EditarEntidad } from "../../utils/EditarEntidad";
import { urlActors } from "../../utils/endpoints/endpoints";
import { ActorCreacionDTO, ActorDTO } from "./actores.model";
import { FormularioActores } from "./FormularioActores"
import { convertActorToFormData } from '../../utils/form/FormDataUtils';

export const EditarActores = () => {

    const parse =(actor:ActorDTO)=>{

        return {
            name:actor.name,
            photoURL: actor.photo,
            biogrpahy:actor.biography,
            birthDate : new Date(actor.birthDate)
        }
    }
    return (
        <>
            <EditarEntidad<ActorCreacionDTO, ActorDTO>
                url={urlActors}
                urlIndice="/actores"
                nombreEntidad="Actor"
                transformar={parse}
                transformarFormData={convertActorToFormData}
            >
                {(entidad, editar) => <FormularioActores
                    modelo={entidad}
                    onSubmit={async (valores) => {
                        await editar(valores);

                    }}
                />}

            </EditarEntidad>
        </>
    )
}

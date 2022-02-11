import { EditarEntidad } from "../../utils/EditarEntidad";
import { urlCinemas } from "../../utils/endpoints/endpoints";
import { CineDTO, cinesCreacionDTO } from "./cines.model";
import { FormularioCine } from "./FormularioCine"

export const EditarCines = () => {
    return (
    <EditarEntidad<cinesCreacionDTO,CineDTO>
      url={urlCinemas}
      urlIndice="/cines"
      nombreEntidad="Cines"
      >
        {(entidad, editar) => <FormularioCine
          modelo={entidad}
          onSubmit={async (valores) => {
            await editar(valores);

          }}
        />}

      </EditarEntidad>
    )
}

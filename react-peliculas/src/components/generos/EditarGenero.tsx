import { EditarEntidad } from '../../utils/EditarEntidad';
import { urlGeneros } from "../../utils/endpoints/endpoints";
import { FormularioGeneros } from "./FormularioGeneros";
import { GeneroCreacionDTO, GeneroDTO } from "./generos.model";
export const EditarGenero = () => {

  return (
    <>
      <EditarEntidad <GeneroCreacionDTO,GeneroDTO>
      url={urlGeneros}
      urlIndice="/generos"
      nombreEntidad="Géneros"
      >
        {(entidad, editar) => <FormularioGeneros
          modelo={entidad}
          onSubmit={async (valores) => {
            await editar(valores);

          }}
        />}

      </EditarEntidad>


    </>
  );
};

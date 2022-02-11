import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { urlGeneros } from '../../utils/endpoints/endpoints';
import { FormularioGeneros } from './FormularioGeneros';
import { GeneroCreacionDTO } from './generos.model';
import {ListadoErrores } from '../../utils/form/ListadoErrores'
import { useState } from 'react';
export const CrearGenero = () => {

  const history = useHistory();
const [errores,setErrores] = useState<string[]>([])


  const crearGenero = async (genero: GeneroCreacionDTO) => {
    try {

      await axios.post(urlGeneros, genero)
      history.push("/generos")
    } catch (error) {

      setErrores(error.response.data)
    }
  }

  return (
    <div>
      <h3>Crear Genero</h3>
      <ListadoErrores errores={errores} />
      <FormularioGeneros
        modelo={{ nombre: "" }}
        onSubmit={async (valores) => {

         await crearGenero(valores);
        }}
      />
    </div>
  );
};

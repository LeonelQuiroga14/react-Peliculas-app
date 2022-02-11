import React, { useContext, useState } from 'react'
import { UserCredentials,AuthenticationResponse } from './auth.model'
import {urlAccount} from '../utils/endpoints/endpoints'
import {ListadoErrores} from '../utils/form/ListadoErrores'
import { getClaims, saveTokenLocalStorage } from './jwtManager'
import { useHistory } from 'react-router-dom'
import FormularioAuth from './FormularioAuth'
import axios from 'axios'
import AutenticacionContext from '../contexts/AutenticacionContext'



const Registro = () => {
  const [errores, setErrores] = useState<string[]>([])
  const { actualizar } = useContext(AutenticacionContext)
  const history = useHistory();
  const registrar = async (credentials: UserCredentials) => {

    try {
      const response = await axios.post<AuthenticationResponse>(`${urlAccount}/Create`,credentials)
      saveTokenLocalStorage(response.data);
      actualizar(getClaims());
      history.push("/")
    } catch (error) {
      console.log(error.response.data)
      setErrores(error.response.data)
    }
    }

  return (
    <>
    <h3>Registro</h3>
    <ListadoErrores errores={errores}/>
      <FormularioAuth
      onSubmit={async values => await registrar(values)}
      model={{ email: '', password: '' }}
      />
      </>
  )
}

export default Registro;

import React, { useContext, useState } from 'react'
import FormularioAuth from './FormularioAuth'
import { ListadoErrores } from '../utils/form/ListadoErrores'
import { AuthenticationResponse, UserCredentials } from './auth.model';
import { urlAccount } from '../utils/endpoints/endpoints';
import axios from 'axios';
import AutenticacionContext from '../contexts/AutenticacionContext';
import { useHistory } from 'react-router-dom';
import {getClaims, saveTokenLocalStorage} from './jwtManager';
const Login = () => {

    const [errores, setErrores] = useState<string[]>([]);
    const { actualizar } = useContext(AutenticacionContext)
    const history = useHistory();

    const login = async (values: UserCredentials) => {

        try {
            const response = await axios.post<AuthenticationResponse>(`${urlAccount}/Login`, values);
            saveTokenLocalStorage(response.data);
            actualizar(getClaims());
            history.push("/")
        } catch (error) {
            setErrores(error.response.data);

        }
    }
    return (
        <>
            <h3>Login</h3>
            <ListadoErrores errores={errores} />
            <FormularioAuth
                model={{ email: '', password: '' }}
                onSubmit={async values => await login(values)}
            />
        </>
    )
}
export default Login;

import React from 'react'
import { claim } from '../auth/auth.model';
const AutenticacionContext = React.createContext<{
    claims: claim[];
    actualizar(claims: claim[]): void;

}>({ claims: [], actualizar: () => { } })
export default AutenticacionContext;
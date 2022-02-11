import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import { Button } from '../utils/Button'
import confirmar from '../utils/Confirmar'
import { urlAccount } from '../utils/endpoints/endpoints'
import { IndiceEntidad } from '../utils/IndiceEntidad'
import { UsuarioDTO } from './auth.model'

export const IndexUsers = () => {

    const handleAddAdmin = async(id:string)=>{

        await  axios({
            url:`${urlAccount}/User/Permission/Admin`,
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            data: JSON.stringify(id)
 
        })
        handleAlert();
       
    }
    const handleRemoveAdmin = async(id:string)=>{

        await  axios({
            url:`${urlAccount}/User/Permission/Admin`,
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json"
            },
            data: JSON.stringify(id)
 
        })
       handleAlert();
    }

    const handleAlert = () => {

        Swal.fire({
            title:"Éxito ",
            text:"Operación realizada con éxito",
            icon:'success'
        })
    }




    return (
        <IndiceEntidad<UsuarioDTO>
            url={`${urlAccount}/User/List`}
            titulo="Usuarios">
            {
                users => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <tr key={user.id}>

                                    <td>
                                        <Button onClick={() => confirmar(()=> handleAddAdmin(user.id),
                                            `¿Desea dar permiso de administrador a ${user.email}?`,'Confirmar')}>
                                            Hacer Admin
                                        </Button>

                                        <Button className='btn btn-danger ml-2' onClick={() =>confirmar(()=> handleRemoveAdmin(user.id),
                                            `¿Desea quitar permiso de administrador a ${user.email}?`,'Confirmar')}>
                                            Quitar Admin
                                        </Button>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </>

                )
            }
        </IndiceEntidad>

    )
}

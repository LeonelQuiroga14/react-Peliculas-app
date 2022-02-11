import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { useHistory, useParams } from 'react-router-dom';
import { ListadoErrores } from "./form/ListadoErrores";
import { Cargando } from './Cargando'
import { convertActorToFormData } from './form/FormDataUtils';
export const EditarEntidad = <TCreacion, TLectura>(props: editarEntidadProps<TCreacion, TLectura>) => {

    const { id }: any = useParams();
    const history = useHistory();
    const [entidad, setEntidad] = useState<TCreacion>()
    const [errores, setErrores] = useState<string[]>([]);


    useEffect(() => {

        axios.get(`${props.url}/${id}`,)
            .then((response: AxiosResponse<TLectura>) => {
                setEntidad(props.transformar(response.data));

            })
    }, [])


    const editar = async (entidadEditar: TCreacion) => {

        try {
            if(props.transformarFormData)
            {
                 const formData =props.transformarFormData(entidadEditar);
                 await axios({
                    method:'put',
                    url:`${props.url}/${id}`,
                    data:formData,
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                })
            }else{
                await axios.put(`${props.url}/${id}`, entidadEditar)
            }
            history.push(props.urlIndice)
        } catch (error) {
            console.error(error)
            setErrores(error.response.data)
        }
    }

    return (<>
        <h3>Editar {props.nombreEntidad}</h3>
        <ListadoErrores errores={errores} />
        {entidad ? props.children(entidad, editar) : <Cargando />}
    </>)
};

interface editarEntidadProps<TCreacion, TLectura> {

    url: string;
    urlIndice: string;
    nombreEntidad: string;
    children(eniidad: TCreacion, editar: (entidad: TCreacion) => void): ReactElement;
    transformar(entidad: TLectura): TCreacion;
    transformarFormData?(modelo:TCreacion):FormData
}

EditarEntidad.defaultProps = {
    transformar: (entidad: any) => entidad
}
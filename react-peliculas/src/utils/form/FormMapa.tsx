import { useFormikContext } from 'formik'
import React from 'react'
import { CoordenadaDTO } from '../mapa/coordenadas.model'
import { Mapa } from '../mapa/Mapa'

export const FormMapa = (props: formMapaProps) => {


    const { values } = useFormikContext<any>();
    const actualizarCampos = (coordenadas: CoordenadaDTO) => {

        values[props.campoLat] = coordenadas.lat;
        values[props.campoLng] = coordenadas.lng;
    }
    return (
        <Mapa
            coordenadas={props.coordenadas}
            handleClickMapa={actualizarCampos}
        />

    )
}
interface formMapaProps {
    coordenadas: CoordenadaDTO[];
    campoLat: string;
    campoLng: string;
}

FormMapa.defaultProps = {
    coordenadas: []

}
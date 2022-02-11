import React, { useState } from 'react'
import { MapContainer, TileLayer, useMapEvent, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { CoordenadaDTO } from './coordenadas.model'
let defaultIcon = L.icon({

    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

L.Marker.prototype.options.icon = defaultIcon;
export const Mapa = (props: mapaProps) => {

    const [coordenadas, setCoordenadas] = useState<CoordenadaDTO[]>(props.coordenadas)
    return (
        <div>
            <MapContainer
                center={[-34.958372, - 58.727025]}
                zoom={14}
                style={{ height: props.height }}
            >

                <TileLayer attribution='React Películas'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
                {
                    !props.readOnly &&
                    <ClickMapa setPunto={coordenadas => {
                        setCoordenadas([coordenadas])
                        props.handleClickMapa(coordenadas);

                    }} />
                }
                {coordenadas.map(coordenada => {

                    return <Marcador key={coordenada.lat + coordenada.lng}
                        {...coordenada} />
                })}
            </MapContainer>
        </div>
    )
}


const ClickMapa = (props: clickMapaProps) => {

    useMapEvent('click', e => {

        props.setPunto({
            lat: e.latlng.lat,
            lng: e.latlng.lng
        })
    })
    return null
}


const Marcador = (props: CoordenadaDTO) => <Marker position={[props.lat, props.lng]}>
    {props.name && <Popup>{props.name} </Popup>}
</Marker>
interface clickMapaProps {

    setPunto(coordenadas: CoordenadaDTO): void;
}
interface mapaProps {

    height: string;
    coordenadas: CoordenadaDTO[];
    handleClickMapa(coordenadas: CoordenadaDTO): void;
    readOnly: boolean;
}


Mapa.defaultProps = {

    height: "500px",
    readOnly: false,
    handleClickMapa: () => { }
}
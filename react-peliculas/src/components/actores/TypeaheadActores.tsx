import React, { useState } from 'react'
import { ActorDTO, ActorPeliculaDTO } from './actores.model'
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import axios, { AxiosResponse } from 'axios'
import { urlActors } from '../../utils/endpoints/endpoints'
export const TypeaheadActores = (props: typeaheadActoresProps) => {


    const seleccion: ActorPeliculaDTO[] = [];

    const [elementoArrastrado, setElementoArrastrado] = useState<ActorPeliculaDTO | undefined>(undefined)

    const [isLoadingTa, setLoadingTa] = useState<boolean>(false)
    const [opciones, setOpciones] = useState<ActorPeliculaDTO[]>([])
    const manejarDragStart = (actor: ActorPeliculaDTO) => {
        setElementoArrastrado(actor);
    }

    const handleSearch = (query: string) => {
        setLoadingTa(true)

        axios.get(`${urlActors}/Search/ByName/${query}`)
            .then((response: AxiosResponse<ActorPeliculaDTO[]>) => {
                
                setOpciones(response.data)
                setLoadingTa(false);


            })

    }


    const manejarDragOver = (actor: ActorPeliculaDTO) => {

        if (!elementoArrastrado) return;
        if (actor.id !== elementoArrastrado.id) {
            const indiceArrastrado = props.actores.findIndex(x => x.id === elementoArrastrado.id);
            const actorIndice = props.actores.findIndex(x => x.id === actor.id);
            const actores = [...props.actores];
            actores[actorIndice] = elementoArrastrado;
            actores[indiceArrastrado] = actor;
            props.onAdd(actores)
        }

    }

    return (
        <>
            <label >Actores</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={actores => {
                    if (props.actores.findIndex(x => x.id === actores[0].id) === -1) {
                        props.onAdd([...props.actores, actores[0]])

                    }
                }}
                options={opciones}
                filterBy={() => true}
                onSearch={handleSearch}
                labelKey={actor => actor.name}
                placeholder='Escriba un nombre...'
                minLength={3}
                isLoading={isLoadingTa}
                selected={seleccion}
                flip={true}
                renderMenuItemChildren={(actor) => (
                    <>
                        <img src={actor.photo} alt="imagen-actor"
                            style={{ height: "70px", marginRight: "10px", width: '64px' }} />
                        <span>{actor.name}</span>
                    </>
                )}
            />
            <ul className='list-group'>

                {props.actores.map((actor, idx) => {

                    return (<><li
                        draggable={true}
                        className='list-group-item list-group-item-action'
                        onDragStart={() => manejarDragStart(actor)}
                        onDragOver={() => manejarDragOver(actor)}
                        key={actor.id}>{props.listadoUI(actor)}
                        <span key={actor.id} className='badge badge-primary badge-pill pointer' style={{ marginLeft: '0.5rem' }} onClick={() => props.onRemove(actor)}>X</span>

                    </li>
                    </>)
                })}
            </ul>
        </>
    )
}
interface typeaheadActoresProps {

    actores: ActorPeliculaDTO[];
    onAdd(actores: ActorPeliculaDTO[]): void;
    onRemove(actores: ActorPeliculaDTO): void;
    listadoUI(actor: ActorPeliculaDTO): ReactElement;
}
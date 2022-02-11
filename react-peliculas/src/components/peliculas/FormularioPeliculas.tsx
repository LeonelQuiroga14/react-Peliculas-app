import { Form, Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { PeliculaCreacionDTO } from './peliculas.model'
import * as Yup from 'yup'

import { FormGroupText } from '../../utils/form/FormGroupText'
import { FormGroupFecha } from '../../utils/form/FormGroupFecha'
import { FormGroupImagen } from '../../utils/form/FormGroupImagen'
import { FormGroupCheckbox } from '../../utils/form/FormGroupCheckbox'
import { FormGroupSelectorMultiple, SelectorMultipleModel } from '../../utils/form/FormGroupSelectorMultiple'

import { Button } from '../../utils/Button'
import { Link } from 'react-router-dom'
import { GeneroDTO } from '../generos/generos.model'
import { TypeaheadActores } from '../actores/TypeaheadActores'
import { CineDTO } from '../cines/cines.model'
import { ActorCreacionDTO, ActorPeliculaDTO } from '../actores/actores.model'

export const FormularioPelicula = (props: formularioPeliculaProps) => {

    const mapear = (arreglo: { id: number, name: string }[]): SelectorMultipleModel[] => {

        return arreglo.map(valor => {
            return { llave: valor.id, valor: valor.name }
        })
    }
    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados))
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados))

    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados))
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados))

    const [actoresSeleccionados, setActoresSeleccionados] = useState<ActorPeliculaDTO[]>(props.actoresSeleccionados)


    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={(valores, acciones) => {

                valores.genderIds = generosSeleccionados.map(valor => valor.llave);
                valores.cinemaIds = cinesSeleccionados.map(valor => valor.llave);
                valores.actors= actoresSeleccionados;
                props.onSubmit(valores, acciones)

            }}
            validationSchema={Yup.object({
                title: Yup.string().required("Este campo es requerido"),
                resume: Yup.string().required("Este campo es requerido")
            })}
        >
            {
                (formikProps) => (

                    <Form>
                        <FormGroupText campo='title' label='Titulo' placeholder='Ingrese un Título' />
                        <FormGroupText campo='description' label='Descripción' placeholder='Ingrese una descripcion' />
                        <FormGroupFecha campo='premiereDtae' label='Fecha estreno' />
                        <FormGroupCheckbox campo='inCinema' label='En cines' />
                        <FormGroupText campo='trailer' label='Trailer' placeholder='Ingrese url del trailer' />
                        <FormGroupImagen campo='poster' label='Poster' imagenURL={props.modelo.posterURL} />
                        <FormGroupText campo='resume' label='Resumen' placeholder='Ingrese un resumen' />
                        <div className='form-group'>
                            <label >Géneros</label>
                            <FormGroupSelectorMultiple
                                seleccionados={generosSeleccionados}
                                noSeleccionados={generosNoSeleccionados}
                                onChange={(seleccionados, noSeleccionados) => {

                                    setGenerosNoSeleccionados(noSeleccionados);
                                    setGenerosSeleccionados(seleccionados);
                                }}
                            />

                        </div>

                        <div className='form-group'>
                            <label >Cines</label>
                            <FormGroupSelectorMultiple
                                seleccionados={cinesSeleccionados}
                                noSeleccionados={cinesNoSeleccionados}
                                onChange={(seleccionados, noSeleccionados) => {

                                    setCinesNoSeleccionados(noSeleccionados);
                                    setCinesSeleccionados(seleccionados);
                                }}
                            />

                        </div>

                        <div className='form-group'>
                            <TypeaheadActores actores={actoresSeleccionados}

                                onAdd={actores => {
                                    setActoresSeleccionados(actores)

                                }}


                                onRemove={actor => {
                                    const actores = actoresSeleccionados.filter(x=> x !== actor );
                                    setActoresSeleccionados(actores)

                                }}



                                listadoUI={(actor: ActorPeliculaDTO) => <>
                                    {actor.name} / <input type="text" placeholder='Personaje' value={actor.character}
                                        onChange={e => {

                                            const indice = actoresSeleccionados.findIndex(x => x.id === actor.id);
                                            const actores = [...actoresSeleccionados];
                                            actores[indice].character = e.currentTarget.value;
                                            setActoresSeleccionados(actores);
                                        }}
                                    />
                                </>
                                }
                            />


                        </div>

                        <Button disabled={formikProps.isSubmitting} type="submit">Guardar</Button>
                        <Link className="btn btn-secondary" to="/">
                            Cancelar
                        </Link>

                    </Form>
                )

            }
        </Formik>
    )
}
interface formularioPeliculaProps {

    modelo: PeliculaCreacionDTO;
    onSubmit(valores: PeliculaCreacionDTO, acciones: FormikHelpers<PeliculaCreacionDTO>): void;
    generosSeleccionados: GeneroDTO[];
    generosNoSeleccionados: GeneroDTO[];
    cinesSeleccionados: CineDTO[];
    cinesNoSeleccionados: CineDTO[];
    actoresSeleccionados:ActorPeliculaDTO[];
}
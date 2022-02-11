import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from '../../utils/Button'
import { FormGroupText } from '../../utils/form/FormGroupText'
import { FormMapa } from '../../utils/form/FormMapa'
import { CoordenadaDTO } from '../../utils/mapa/coordenadas.model'
import { cinesCreacionDTO } from './cines.model'

export const FormularioCine = (props: formularioCineProps) => {


    const transformarCoordenadas = (): CoordenadaDTO[] | undefined => {

        if (props.modelo.latitude && props.modelo.longitude) {
            const respuesta: CoordenadaDTO = {

                lat: props.modelo.latitude,
                lng: props.modelo.longitude
            }
          return [respuesta]
        }
        return undefined
    }
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({

                name: Yup.string().required("Este campo es requerido")
            })}
        >

            {
                (formikProps) => (
                    <Form>

                        <FormGroupText label="name" campo="name" />

                        <div style={{ marginBottom: "1rem" }}>
                            <FormMapa
                                campoLat='latitude'
                                campoLng='longitude'
                                coordenadas={transformarCoordenadas()}
                            />
                        </div>
                        <Button disabled={formikProps.isSubmitting}
                            type='submit'
                        >Guardar</Button>
                        <Link className="btn btn-secondary" to="/cines">
                            Cancelar
                        </Link>
                    </Form>


                )
            }
        </Formik>
    )
}
interface formularioCineProps {

    modelo: cinesCreacionDTO;
    onSubmit(valores: cinesCreacionDTO, acciones: FormikHelpers<cinesCreacionDTO>): void;
}
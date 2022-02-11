import { Form, Formik, FormikHelpers } from 'formik'
import { ActorCreacionDTO } from './actores.model'
import { FormGroupText } from '../../utils/form/FormGroupText'
import { FormGroupFecha } from '../../utils/form/FormGroupFecha'
import {FormGroupImagen} from '../../utils/form/FormGroupImagen'
import {FormGroupMarkdown} from '../../utils/form/FormGroupMarkdown'

import { Button } from '../../utils/Button'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

export const FormularioActores = (props: formularioActoresProps) => {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required("Este campo es requerido").primerLetraMayuscula(),
                birthDate: Yup.date().nullable().required("Este campo es requerido")
            })}
        >
            {formikProps => (

                <Form>
                    <FormGroupText campo='name'
                        label='Nombre'
                        placeholder='Ingrese el nombre'

                    />
                    <FormGroupFecha
                        label='Fecha nacimiento'
                        campo='birthDate'
                    />

                    <FormGroupImagen
                    campo='photo' label='Foto' imagenURL={props.modelo.photoURL}
                    />

                    <FormGroupMarkdown campo='biography' label="Biografía"/>
                    <Button
                        disabled={formikProps.isSubmitting}
                        type='submit'
                    >Guardar</Button>
                    <Link className="btn btn-secondary mb-2" to="/actores">Cancelar</Link>
                </Form>

            )}

        </Formik>
    )
}
interface formularioActoresProps {

    modelo: ActorCreacionDTO;
    onSubmit(valores: ActorCreacionDTO, acciones: FormikHelpers<ActorCreacionDTO>): void;
}
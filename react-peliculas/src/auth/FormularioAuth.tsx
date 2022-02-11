import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { UserCredentials } from './auth.model'
import * as Yup from 'yup'
import { FormGroupText } from '../utils/form/FormGroupText'
import { Button } from '../utils/Button'
import { Link } from 'react-router-dom'

const FormularioAuth = (props: formularioAuthProps) => {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required("Este campo es obligatorio.").email("Debe ingresar un email válido."),
                password: Yup.string().required("Este campo es requerido")

            })}
        >
            {
                (formikProps) => (

                    <Form>
                        <FormGroupText label='Email' campo='email' />
                        <FormGroupText label='Password' campo='password' type='password' />

                     <Button disabled={formikProps.isSubmitting} type='submit' >Login</Button>
                     <Link className='btn btn-secondary' to="/">Cancelar</Link>
                    </Form>
                )
            }

        </Formik>
    )
}

interface formularioAuthProps {

    model: UserCredentials;
    onSubmit: (values: UserCredentials, actions: FormikHelpers<UserCredentials>) => void;
}
export default FormularioAuth
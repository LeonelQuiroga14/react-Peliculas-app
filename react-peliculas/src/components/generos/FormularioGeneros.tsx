import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { Button } from "../../utils/Button";
import { FormGroupText } from '../../utils/form/FormGroupText'
import { GeneroCreacionDTO } from './generos.model';
export const FormularioGeneros = (props:formularioGenerosProps) => {
    return (
        <>
           <Formik
        initialValues={props.modelo}
        validationSchema={Yup.object({
          name: Yup.string().required("Este campo es requerido")
          .max(50,"La longitud máxima es de 50 caracteres")
            .primerLetraMayuscula()
        })}
        onSubmit={props.onSubmit} 
      >
        {(formikProps) => (
          <Form>
            <FormGroupText campo="name"
              placeholder="Ingrese el nombre del género"
              label="Nombre" />
            <Button disabled={formikProps.isSubmitting} type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/generos">
              Cancelar
            </Link>
          </Form>



        )}
      </Formik>  
        </>
    )
}


interface formularioGenerosProps{

    modelo:GeneroCreacionDTO;
    onSubmit(valores:GeneroCreacionDTO, accion:FormikHelpers<GeneroCreacionDTO>):void;
}

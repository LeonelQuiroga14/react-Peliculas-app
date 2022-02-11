import { useFormikContext } from 'formik'
import React from 'react'
import { ErrorCampo } from './ErrorCampo'

export const FormGroupFecha = (props: formGroupFechasProps) => {
    const { values, validateForm, touched, errors } = useFormikContext<any>()
    return (
        <div className='form-group'>
            <label htmlFor={props.campo}>{props.label}</label>
            <input type="date"
                id={props.campo}
                defaultValue={values[props.campo]?.toLocaleDateString('en-CA')}
                className="form-control"
                onChange={e => {
                    const fecha = new Date(e.currentTarget.value + 'T00:00:00')
                    values[props.campo] = fecha;
                    validateForm();
                }}
            />
            {touched[props.campo] && errors[props.campo]
                && <ErrorCampo
                    mensaje={errors[props.campo]?.toString()!}

                />}
        </div>
    )
}
interface formGroupFechasProps {

    campo: string;
    label: string;
}
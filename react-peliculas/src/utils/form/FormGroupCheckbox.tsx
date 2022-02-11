import React from 'react'
import { ErrorMessage, Field } from "formik";
import { ErrorCampo } from './ErrorCampo';

export const FormGroupCheckbox = (props: formGrupCheckboxProps) => {
    return (
        <div className="form-group form-check">
            <Field
                id={props.campo}
                className="form-check-input"   
                name={props.campo}
                type="checkbox"

            />
            <label htmlFor={props.campo}>
            {props.label}
            </label>
        </div>
    )
}
interface formGrupCheckboxProps {

    campo: string;
    label?: string;
}
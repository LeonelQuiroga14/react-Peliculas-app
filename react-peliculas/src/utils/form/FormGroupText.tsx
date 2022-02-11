import React from 'react'
import { ErrorMessage, Field } from "formik";
import { ErrorCampo } from './ErrorCampo';

export const FormGroupText = (props:formGrupTextProps) => {
    return (
        <div className="form-group">
       
       {props.label && 
       
         <label htmlFor={props.campo} className="form-label">
          {props.label}
         </label>
       }
        <Field name={props.campo} type={props.type} placeholder={props.placeholder} className="form-control" />
        <ErrorMessage name={props.campo}>{
            mensaje =>
            <ErrorCampo mensaje={mensaje}/>
        }</ErrorMessage>
      </div>
    )
}
FormGroupText.defaultProps ={

  type:"text"
}
interface formGrupTextProps{

    campo:string;
    label?:string;
    placeholder?:string;
    type:'text' | 'password';
}
import React from 'react';

export const ListadoErrores = (props:listadoErroresProps) => {
    const style ={color:'red'}
  return (
  <>
  {
      props.errores  && <ul style={style}>

          {props.errores.map((error,index)=> <li key={index}>{error}</li>)}
      </ul>
  }
  </>
    );
};

interface listadoErroresProps{
errores?: string[];

}
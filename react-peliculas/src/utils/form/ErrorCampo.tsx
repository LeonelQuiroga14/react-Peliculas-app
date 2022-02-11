import React from 'react'

export const ErrorCampo = (props: errorCampoProps) => {
    return (
        <div className="text-danger">
            {props.mensaje}
        </div>
    )
}

interface errorCampoProps {

    mensaje: string;
}
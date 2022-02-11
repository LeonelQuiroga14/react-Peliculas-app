import React from 'react'
import { Redirect } from 'react-router-dom'

export const RedireccionarLanding = () => {
    return (
       <Redirect to={{pathname:'/'}}/>
    )
}

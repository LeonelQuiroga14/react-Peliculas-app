import { useFormikContext } from 'formik'
import React, { ChangeEvent,useState } from 'react'

export const FormGroupImagen = (props: formGroupImagen) => {

const divStyle = { marginTop:"10px"}
const imgStyle ={width:"450px"}

    const [imagenBase64, setImagenBase64] = useState('')
    const [imagenURL, setImagenURL] = useState(props.imagenURL)
    const {values} = useFormikContext<any>();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const archivo = e.currentTarget.files[0];
            toBase64(archivo)
            .then((valor:string) => setImagenBase64(valor))
            .catch(error => console.error(error));
            values[props.campo] = archivo;
            setImagenURL('')
        }

    }

    const toBase64 = (file: File) => {

        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error);
    })
}
return (
    <div className='form-group'>
        <label >{props.label}</label>
        <div>
            <input type="file" accept='.jpg,.jpeg,.png'
                onChange={handleOnChange}
            />
        </div>
        {
        imagenBase64 && 
        <div style={divStyle}>
            <img style ={imgStyle}src={imagenBase64} alt="Foto Actor" />
            </div>
            }

{
        imagenURL && 
        <div style={divStyle}>
            <img style ={imgStyle}src={imagenURL} alt="Foto Actor" />
            </div>
            }
    </div>
)
}

interface formGroupImagen {

    campo: string;
    label: string;
    imagenURL: string;
}
FormGroupImagen.defaultProps = {

    imagenURL:''
}
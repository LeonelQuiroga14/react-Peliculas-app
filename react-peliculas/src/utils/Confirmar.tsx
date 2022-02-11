
import Swal from 'sweetalert2';

const confirmar = (onConfirm: any, title: string = '¿Desea borrar el registro?',
    textoBotonConfirmacion: string = "Ok") => {

    Swal.fire({
        title: title,
        confirmButtonText: textoBotonConfirmacion,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then(res => {
        if (res.isConfirmed)
            onConfirm();
    })
}
export default confirmar
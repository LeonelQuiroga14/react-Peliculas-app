import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { Button } from './Button';
import confirmar from './Confirmar';
import { ListadoGenerico } from './ListadoGenerico';
import { Paginacion } from './Paginacion';
export const IndiceEntidad = <T,>(props: indiceEntidadProps<T>) => {
    const [entidades, setEntidades] = useState<T[]>([])
    const [totalPaginas, setTotalPaginas] = useState<number>(0)
    const [recordsPorPagina, setRecordsPorPagina] = useState<number>(10)
    const [pagina, setPagina] = useState<number>(1);


    useEffect(() => {

        cargarDatos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, recordsPorPagina])

    const cargarDatos = () => {

        axios.get(props.url, {
            params: {
                pagina,
                recordsPorPagina,

            }
        })
            .then((response: AxiosResponse<T[]>) => {
                const totalRegistros = parseInt(response.headers['totalregistros'], 10);
                setTotalPaginas(Math.ceil(totalRegistros / recordsPorPagina))
                setEntidades(response.data);
            })
    }

    const borrar = async (id: number) => {
        try {
            await axios.delete(`${props.url}/${id}`);
            cargarDatos();
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    const botones = (urlEditar: string, id: number) => <>
        <Link className='btn btn-success' to={urlEditar}>
            Editar
        </Link>
        <Button
            onClick={() => confirmar(() => borrar(id),)}
            className='btn btn-danger'>Borrar</Button>
    </>

    return (<>
        <h3> {props.nombreEntidad}</h3>
        {
            props.urlCreacion &&
            <Link className='btn btn-primary' to={props.urlCreacion}>
                Crear{props.nombreEntidad}
            </Link>
        }


        <div className='form-group' style={{ width: '150px', }}>
            <label>
                Registros por página:
            </label>
            <select
                defaultValue={10}
                className='form-control'
                onChange={e => {
                    setPagina(1);
                    setRecordsPorPagina(parseInt(e.currentTarget.value, 10))
                }
                }
            >

                <option value={10}>
                    10
                </option>
                <option value={25}>
                    25
                </option>
                <option value={50}>
                    50
                </option>
            </select>
        </div>
        <Paginacion
            cantidadTotalPaginas={totalPaginas}
            paginaActual={pagina}
            onChange={nuevaPagina => setPagina(nuevaPagina)}
        />
        <ListadoGenerico
            listado={entidades}
        >

            <table className='table table-striped'>
                {props.children(entidades!, botones)}

            </table>
        </ListadoGenerico>
    </>

    );
};
interface indiceEntidadProps<T> {
    url: string;
    urlCreacion?: string;
    children(entidades: T[], botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
    titulo: string;
    nombreEntidad?: string;
}
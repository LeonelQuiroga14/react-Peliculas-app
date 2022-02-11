import axios, { AxiosResponse } from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Button } from "../../utils/Button"
import { urlGeneros, urlMovies } from "../../utils/endpoints/endpoints"
import { Paginacion } from "../../utils/Paginacion"
import { GeneroDTO } from "../generos/generos.model"
import { ListadoPeliculas } from "./ListadoPeliculas"
import { PeliculaDTO } from "./peliculas.model"

export const FiltroPeliculas = () => {

    const valorInicial: filtroPeliculasForm = {
        title: '',
        genderId: 0,
        nextReleases: false,
        inCinema: false,
        page: 1,
        recordsPerPage: 10
    }
    const history= useHistory();

    const [generos, setGeneros] = useState<GeneroDTO[]>([])
    const [peliculas, setPelicuas] = useState<PeliculaDTO[]>([]);
    const [totalPaginas, setTotalPaginas] = useState<number>(0)

    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
       if(query.get('title'))
         {
             valorInicial.title= query.get("title")!
         }
         if(query.get('genderId'))
         {
             valorInicial.genderId= parseInt(query.get("genderId")!,10)
         }
         if(query.get('inCinema'))
         {
             valorInicial.inCinema=true
         }
         if(query.get('nextReleases'))
         {
             valorInicial.nextReleases=true
         }
         if(query.get('page'))
         {
             valorInicial.genderId= parseInt(query.get("page")!,10)
         }


        searchMovie(valorInicial);
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        axios.get(`${urlGeneros}/All`)
            .then((response: AxiosResponse<GeneroDTO[]>) => {
                setGeneros(response.data)
            })

    }, [])


    const modifyUrl =(values: filtroPeliculasForm)=>{
          const queryString:string[] = [];
          if(values.title)
          {
              queryString.push(`title=${values.title}`);
              
          }
          if(values.genderId)
          {
              queryString.push(`genderId=${values.genderId}`);
              
          }

          if(values.nextReleases)
          {
              queryString.push(`nextReleases=${values.nextReleases}`);
              
          }
          if(values.inCinema)
          {
              queryString.push(`inCinema=${values.inCinema}`);
              
          }
          queryString.push(`page=${values.page}`)

          history.push(`/peliculas/filtrar?${queryString.join("&")}`)
    }

    const searchMovie = (values: filtroPeliculasForm) => {
        modifyUrl(values);
        axios.get(`${urlMovies}/filter`, { params: values })
            .then((response: AxiosResponse<PeliculaDTO[]>) => {
                const totalRegistros = parseInt(response.headers['totalregistros'], 10);
                setTotalPaginas(Math.ceil(totalRegistros / valorInicial.recordsPerPage))
                setPelicuas(response.data)

            })
    }

    return (
        <>
            <h3>
                Filtro Peliculas
            </h3>

            <Formik
                initialValues={valorInicial}
                onSubmit={valores => {
                    valores.page = 1;
                    searchMovie(valores)
                
                }}
            >
                {formikProps =>
                (<><Form>
                    <div className="form-inline">
                        <div className="form-group mb-2">
                            <label htmlFor=""></label>
                            <input type="text"
                                id="titulo"
                                className="form-control"
                                placeholder="Título de la película"
                                {...formikProps.getFieldProps('titulo')}
                            />
                        </div>

                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor=""></label>
                            <select className="form-control"
                                {...formikProps.getFieldProps('generoId')}
                            >
                                <option value="0"> --Seleccione un género</option>
                                {
                                    generos.map(genero =>
                                        <option key={genero.id} value={genero.id}>
                                            {genero.name}
                                        </option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group mx-sm-3 mb-2">
                            <Field className="form-check-input"
                                id="proximosEstrenos"
                                name="proximosEstrenos"
                                type="checkbox"

                            />
                            <label htmlFor="proximosEstrenos">
                                Próximos estrenos
                            </label>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <Field className="form-check-input"
                                id="enCines"
                                name="enCines"
                                type="checkbox"

                            />
                            <label htmlFor="enCines">
                                En cines
                            </label>
                        </div>
                        <Button
                            className="btn btn-primary mb-2 mx-sm-3"
                            onClick={() => formikProps.submitForm()}
                        >Filtrar</Button>
                        <Button
                            className="btn btn-danger mb-2"
                            onClick={() => 
                            {
                            formikProps.setValues(valorInicial)
                            searchMovie(valorInicial);
                            }}
                        >Limpiar</Button>
                    </div>

                </Form>
                   <ListadoPeliculas peliculas={peliculas}/>
                   <Paginacion
                   cantidadTotalPaginas={totalPaginas}
                   paginaActual={formikProps.values.page}
                   onChange={nuevaPagina => {
                       formikProps.values.page= nuevaPagina;
                       searchMovie(formikProps.values)
                   }}
               /></>
                )
                }
            </Formik>

         
        </>
    )
}
interface filtroPeliculasForm {

    title: string;
    genderId: number;
    nextReleases: boolean;
    inCinema: boolean;
    page: number;
    recordsPerPage: number;
}


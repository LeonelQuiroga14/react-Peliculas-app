import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom"
import { Autorizado } from "../auth/Autorizado";
import { logOut } from "../auth/jwtManager";
import AutenticacionContext from "../contexts/AutenticacionContext";
import { Button } from "./Button";

export const Menu = () => {
    const activeClass: string = "active";
    const { actualizar,claims } = useContext(AutenticacionContext)
    const history = useHistory();
    const getUserName =():string=> claims.filter(x=> x.name==="email")[0]?.value

    return (
        <nav className='navbar navbar-expand-lg  navbar-dark bg-dark '>
            <div className='container-fluid'>
                <NavLink to="/" activeClassName={activeClass} className='navbar-brand'> React películas</NavLink>
                <div className='collapse navbar-collapse' style={{display:"flex", justifyContent:"space-between"}}>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className="nav-item">
                            <NavLink activeClassName={activeClass} className='nav-link ' to="/peliculas/filtrar">Filtrar Peliculas</NavLink>
                        </li>
                        <Autorizado
                            role="Admin"
                            autorizado={
                                <>
                                    <li className='nav-item'>
                                        <NavLink to="/actores" activeClassName={activeClass} className='nav-link '>
                                            Actores
                                        </NavLink>
                                    </li>

                                    <li className='nav-item'>
                                        <NavLink to="/cines" activeClassName={activeClass} className='nav-link '>
                                            Cines
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink activeClassName={activeClass} className='nav-link ' to="/peliculas/crear">Crear Pelicula</NavLink>


                                    </li>

                                    <li className='nav-item'>
                                        <NavLink to="/generos"
                                            activeClassName={activeClass}
                                            className='nav-link '>
                                            Géneros
                                        </NavLink>
                                    </li>
                                    
                                    <li className='nav-item'>
                                        <NavLink to="/usuarios" activeClassName={activeClass} className='nav-link '>
                                            Usuarios
                                        </NavLink>
                                    </li>
                                    </>
                            }

                        />




                    </ul>

                    <div className="d-flex">
                        <Autorizado
                            autorizado={<>
                            <span className="nav-link">Hola,  {getUserName()}</span>
                            <Button 
                            onClick={()=> {
                                logOut();
                                actualizar([]);
                                history.push("/")
                            }}
                            className="nav-link btn btn-link">Log out</Button>
                            </>}
                            noAutorizado={<>
                                <Link to="/registro"
                                    className="nav-link btn btn-link"
                                >
                                    Registrarse
                                </Link>
                                <Link to="/Login"
                                    className="nav-link btn btn-link"
                                >
                                    Login
                                </Link>
                            </>}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

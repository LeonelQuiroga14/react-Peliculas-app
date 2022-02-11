import { GenerosIndex } from "./components/generos/GenerosIndex";
import { CrearGenero } from "./components/generos/CrearGenero";
import { EditarGenero } from "./components/generos/EditarGenero";

import { ActoresIndex } from "./components/actores/ActoresIndex";
import { CrearActores } from "./components/actores/CrearActores";
import { EditarActores } from "./components/actores/EditarActores";

import { CinesIndex } from "./components/cines/CinesIndex";
import { CrearCines } from "./components/cines/CrearCines";
import { EditarCines } from "./components/cines/EditarCines";

import { FiltroPeliculas } from "./components/peliculas/FiltroPeliculas";
import { CrearPeliculas } from "./components/peliculas/CrearPeliculas";
import { EditarPeliculas } from "./components/peliculas/EditarPeliculas";
import {RedireccionarLanding} from './utils/RedireccionarLanding'

import { LandingPage } from "./components/LandingPage";
import {DetallePelicula} from "./components/peliculas/DetallePelicula";

import Registro from './auth/Registro'
import Login from './auth/Login'
import {IndexUsers} from './auth/IndexUsers'
const rutas = [

    {path:"/generos/crear", componente: CrearGenero  ,isAdmin:true},
    {path:"/generos/editar/:id(\\d+)", componente: EditarGenero ,isAdmin:true},
    {path:"/generos", componente: GenerosIndex, exact:true, isAdmin:true},
    
    {path:"/actores/crear", componente: CrearActores ,isAdmin:true},
    {path:"/actores/editar/:id(\\d+)", componente: EditarActores ,isAdmin:true},
    {path:"/actores", componente: ActoresIndex,exact:true ,isAdmin:true},
    
    {path:"/cines/crear", componente: CrearCines ,isAdmin:true},
    {path:"/cines/editar/:id(\\d+)", componente: EditarCines ,isAdmin:true},
    {path:"/cines", componente: CinesIndex,exact:true ,isAdmin:true},
    
    {path:"/peliculas/detalle/:id(\\d+)", componente: DetallePelicula},
    {path:"/peliculas/crear", componente: CrearPeliculas,isAdmin:true},
    {path:"/peliculas/editar/:id(\\d+)", componente: EditarPeliculas,isAdmin:true},
    {path:"/peliculas/filtrar", componente: FiltroPeliculas},

    {path:"/registro", componente: Registro},
    {path:"/login", componente: Login},
    {path:"/usuarios", componente: IndexUsers, isAdmin:true},
    {path:"/", componente: LandingPage, exact:true},
    {path:"*", componente:RedireccionarLanding },


];

export default rutas;
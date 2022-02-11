import './App.css';
import { Menu } from './utils/Menu'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import rutas from './route-config';
import configurarValidaciones from './utils/validaciones/validacionesYup'
import AutenticacionContext from './contexts/AutenticacionContext'
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.model';
import { getClaims } from './auth/jwtManager';
import {configureAxiosMiddleware} from './middlewares/axiosMiddleware'
function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  const updateClaims = (claims: claim[]) => {

    setClaims(claims);
  }
  useEffect(()=>{
    setClaims(getClaims())
  },[])

  configurarValidaciones();
  configureAxiosMiddleware();

  const isAdmin = (): boolean => claims.findIndex(claim => claim.name == "role" && claim.value === "Admin") > -1;


  const generateRoutes = () => {
    return (
      rutas.map(ruta => {
        return (
          <Route key={ruta.path} path={ruta.path} exact={ruta.exact} >

            {
              ruta.isAdmin && !isAdmin() ?
                <>No tiene permisos para acceder a este componente</>
                :
                <ruta.componente />

            }
          </Route>)
      })
    )
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar: updateClaims }}>

          <Menu />
          <div className="container">

            <Switch>
              {generateRoutes()}
            </Switch>

          </div>

        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

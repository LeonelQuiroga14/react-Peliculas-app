import { AuthenticationResponse, claim } from './auth.model'
const keyToken = 'token';
const keyExpiration = 'token-expiration'


export const saveTokenLocalStorage = (authentication: AuthenticationResponse) => {

    localStorage.setItem(keyToken, authentication.token);
    localStorage.setItem(keyExpiration, authentication.expirationDate.toString());


}

export const getClaims = (): claim[] => {

    const token = localStorage.getItem(keyToken);
    if (!token) return [];
    
    const expiration = localStorage.getItem(keyExpiration)!;
    
    const expirationDate = new Date(expiration)
    if(expirationDate <= new Date()) {
        logOut();
        return [];
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    const response: claim[]=[]
    for (const property in dataToken) {
        response.push({name:property, value:dataToken[property]});
        
    }
   return response;   
}


export const logOut = () =>{
    localStorage.removeItem(keyToken);
    localStorage.removeItem(keyExpiration);

}


export const getToken = ()=> localStorage.getItem(keyToken)
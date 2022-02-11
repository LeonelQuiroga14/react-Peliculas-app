import { json } from 'stream/consumers';
import { ActorCreacionDTO } from '../../components/actores/actores.model'
import { PeliculaCreacionDTO } from '../../components/peliculas/peliculas.model';
export const convertActorToFormData = (actor: ActorCreacionDTO): FormData => {
    const formData = new FormData();

    formData.append("name", actor.name)

    if (actor.biography)
        formData.append("biography", actor.biography)

    if (actor.birthDate)
        formData.append("birthDate", formatDate(actor.birthDate))
    
    if (actor.photo) 
         formData.append("photo", actor.photo)
    return formData;
}


export const convertPeliculaToFormData = (pelicula:PeliculaCreacionDTO):FormData =>{
    const formData = new FormData();
    formData.append("title",pelicula.title);
    if(pelicula.resume)
    
    formData.append("resume",pelicula.resume);
    if(pelicula.trailer)
    formData.append("trailer",pelicula.trailer);
    
    
    formData.append("inCinema",String(pelicula.inCinema));
    if(pelicula.premiereDate)
    formData.append("premiereDate",formatDate(pelicula.premiereDate));


    if(pelicula.poster)
    formData.append("poster",pelicula.poster);

    formData.append("genderIds",JSON.stringify(pelicula.genderIds));
    formData.append("cinemaIds",JSON.stringify(pelicula.cinemaIds));
    formData.append("actors",JSON.stringify(pelicula.actors));
    
    
    return formData;
}


const formatDate = (date: Date) => {
 date = new Date(date);
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: "2-digit"
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}




using System.Collections.Generic;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class MoviePostGetDTO
    {
        public MoviePostGetDTO(){}
        public MoviePostGetDTO(List<GenderDTO> genders, List<CinemaDTO>cinemas) 
        {
            this.Genders = genders;
            this.Cinemas = cinemas;
        }
        public List<GenderDTO> Genders { get; set; }
        public List<CinemaDTO> Cinemas { get; set; }

    }
}

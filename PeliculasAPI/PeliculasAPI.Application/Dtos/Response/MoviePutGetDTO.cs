using System.Collections.Generic;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class MoviePutGetDTO
    {

        public MovieDTO Movie { get; set; }
        public List<GenderDTO> UnSelectedGenders { get; set; }
        public List<GenderDTO> SelectedGenders { get; set; }

        public List<CinemaDTO> UnSelectedCinemas { get; set; }
        public List<CinemaDTO> SelectedCinemas { get; set; }

        public List<MovieActorDTO> Actors { get; set; }

    }
}

using System.Collections.Generic;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class LandingPageDTO
    {
        public List<MovieDTO> InCinemas { get; set; }
        public List<MovieDTO> NextReleases { get; set; }


    }
}

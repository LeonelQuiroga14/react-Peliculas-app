using System;
using System.Collections.Generic;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Resume { get; set; }
        public string Trailer { get; set; }
        public bool InCinema { get; set; }
        public DateTime PremiereDate { get; set; }
        public string Poster { get; set; }
        public List<GenderDTO> Genders { get; set; }
        public List<MovieActorDTO> Actors { get; set; }
        public List<CinemaDTO> Cinemas { get; set; }
        public int UserVote { get; set; }
        public double AverageVotes  { get; set; }

    }
}

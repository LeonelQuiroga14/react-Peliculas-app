using System;
using System.Collections.Generic;

namespace PeliculasAPI.Domain.Models
{
    public class Movie :BaseEntity
    {
        public Movie()
        {
            MovieActors = new();
            MovieGenders = new ();
            MovieCinemas = new();
            Ratings = new();
        }
        public string Title { get; set; }
        public string Resume { get; set; }
        public string Trailer {  get; set; }

        public bool InCinema    { get; set; }

        public DateTime PremiereDate    { get; set; }
        public string Poster { get; set; }

        public List<MovieActor> MovieActors { get; set; }
        public List<MovieCinema> MovieCinemas { get; set; }
        public List<MovieGender> MovieGenders { get; set; }
        public List<Rating> Ratings { get; set; }


    }
}

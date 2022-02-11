using NetTopologySuite.Geometries;
using System.Collections.Generic;

namespace PeliculasAPI.Domain.Models
{
    public  class Cinema:BaseEntity
    {
        public Cinema()
        {
            MovieCinemas = new();
        }
        public string Name { get; set; }
        public Point Location { get; set; }
        public List<MovieCinema> MovieCinemas { get; set; }

    }
}

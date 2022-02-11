namespace PeliculasAPI.Domain.Models
{
    public class MovieCinema
    {
       // public int Id { get; set; }
        public int MovieId { get; set; }
        public int CinemaId { get; set; }

        public Movie Movie { get; set; }
        public Cinema Cinema { get; set; }


    }
}

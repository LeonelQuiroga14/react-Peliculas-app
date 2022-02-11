namespace PeliculasAPI.Application.Dtos.Response
{
    public class CinemaDTO:BaseDTO
    {

        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
